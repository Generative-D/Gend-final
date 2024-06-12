import base64
import json
import tempfile
import uuid
from datetime import datetime
import randword.rand_word as rd
from flask import Flask, request, jsonify

from flask_cors import CORS
from flask_restx import Api, Resource, Namespace
import requests
from time import sleep
import os
import random
from colorthief import ColorThief

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import event



######################################################
#
# Front : React (Vercel distribution)
# Contract : Algokit (Algorand Testnet)
# Backend : Python Flask (AWS EC2 distribution)
#           Python Flask (Team GPU Server, Generate Image, Text)
#
#
#
# demo distribution : https://gend-front.vercel.app/
# demo video : https://www.youtube.com/watch?v=ojb_7EKz78c
# demo pitchdeck : https://drive.google.com/file/d/1LEstHYtODn9SFcoV5dz9dZ-VHhqHmgpu/view?usp=sharing
#
#
#
#
#
#
# written by junhwan kwon, kjh0442@yuhs.ac
# https://www.linkedin.com/in/jun-hwan-kwon/
# 2024.06.12
######################################################






application = Flask(__name__)
application.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///gend_v1.db'
application.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(application)
api = Api(application,
          version=1.1,
          title="GenD in Algorand",)


PLATFORM_ADDRESS = 'pppp'


feel_free_prefix = ["lovely", "fatastics", "dreamy", "jaunty", "splendid", "enchanted", "desirable",
                    "phenomenal", "glorious", "festive", "serene", "idyllic", "resplendent", "euphoric",
                    "bucolic", "halcyon", "luminous", "ethereal", "effervescent", "diaphanous",
                    "languid", "supple", "nostalgic", "mellifluous", "ineffable", "dulcet",
                    "sanguine", "piquant", "serendipitous", 'effulgent', 'aesthetic', 'iridescent',
                    'winsome', 'diurnal', 'effortless', 'quintessential','clever']

feel_free_suffix = ["view", "sky", 'water', 'wood', 'scene', 'sun', 'moon', 'atmosphere', 'nature',
                    'universe', 'dream', 'insight', 'window', 'rain', 'day', 'yesterday', 'tomorrow',
                    'king','queen', 'mind', 'image']


prompt_des = {"description" : "prompt (string)"}
address_des = {"description" : "address (string) from perawallet (unique id)"}
chain_address_des = {"description" : "unique id from NFT from Blockchain contract (string) (each nft must has unique id)"}


systemapi =Namespace('system', description="check system")
mainpage = Namespace('main-page', description="main page can login with perawallet, gen Image with prompt, mine and upload to blockchain when i want.")
marketpage = Namespace('market-page', description="market page can view other AI and items")
Mypage = Namespace('my-page', description="My page can view my AI and items and for user connect(visit)")

api.add_namespace(mainpage)
api.add_namespace(marketpage)
api.add_namespace(Mypage)
api.add_namespace(systemapi)

cors = CORS(application, resource = {r"/api/*" : {"origins" : "*"}}, supports_credentials=True)

# GPU_SERVER_LOCAL_URL = "http://172.30.1.88:3456"
GPU_SERVER_LOCAL_URL = "http://222.107.194.132:3456"
PLATFORM_Web3_address = 'algorands'

class Image(db.Model):
    id = db.Column(db.String(32), primary_key=True,default=lambda: uuid.uuid4().hex)
    created_date = db.Column(db.DateTime, nullable=True,default=datetime.utcnow)
    hash = db.Column(db.String(64), nullable=True)
    maker_address = db.Column(db.Text, nullable=False)
    chain_address = db.Column(db.Text, nullable=True)
    ownerships = db.Column(db.JSON, nullable=True)
    ownerships_num = db.Column(db.Integer, nullable = True)
    prompt = db.Column(db.Text, nullable=False)
    image = db.Column(db.LargeBinary, nullable=False)
    stats = db.Column(db.JSON, nullable=True)
    maker_history = db.Column(db.JSON, nullable=True)
    remarks = db.Column(db.JSON, nullable=True,default = None)

class Customized_AI(db.Model):
    id = db.Column(db.String(32), primary_key=True,default=lambda: uuid.uuid4().hex)
    created_date = db.Column(db.DateTime, nullable=True,default=datetime.utcnow)
    user_address = db.Column(db.Text, nullable=False)
    ownerships_list = db.Column(db.JSON, nullable=True)
    ownerships_num = db.Column(db.Integer, nullable = True)
    current_ai = db.Column(db.Text, nullable = True)
    ai_stats = db.Column(db.JSON, nullable=True)
    latest_date = db.Column(db.DateTime, nullable=True,default=datetime.utcnow)
    remarks = db.Column(db.JSON, nullable=True,default = None)

@event.listens_for(Customized_AI, 'before_update')
def receive_before_update(mapper, connection, target):
    target.latest_date = datetime.utcnow()

def init_db():
    with application.app_context():
        db.create_all()


def insert_image(address, prompt:str, image, stats,
                 ):
    existing_image = Image.query.filter_by(prompt=prompt).first()

    res = {
        'address': address,
        'prompt' : prompt,
        'stats' : stats,
    }

    try:
        if existing_image:
            if existing_image.remarks:
                existing_maker_history = json.loads(existing_image.maker_history)
            else:
                existing_maker_history = []
            existing_maker_history.append(existing_image.maker_address)
            existing_image.maker_address = address
            existing_image.maker_history = json.dumps(existing_maker_history)
            db.session.commit()
            res['message'] = "Image updated with new address"
            res['success'] = True
            return res
        else:
            new_image = Image(
                maker_address=address,
                prompt=prompt,
                image=image,
                stats=stats,
                maker_history=json.dumps([])
            )
            db.session.add(new_image)
            db.session.commit()
            init_user_ai(address)
            res['message'] = "Image inserted successfully and init_new user"
            res['success'] = True
            return res

    except Exception as e:
        db.session.rollback()
        return {"message": "Failed to insert image", "success": False, "error": str(e)}

def retrieve_image(columnname, searchby):

    column = getattr(Image, columnname, None)
    if not column:
        return {"error": "Invalid column name"}, 400

    filters = {columnname: searchby}
    images = Image.query.filter_by(**filters).all()

    result = []
    for image in images:
        image_dict = {column.key: getattr(image, column.key) for column in image.__table__.columns}
        # Convert datetime to string
        if 'created_date' in image_dict and image_dict['created_date']:
            image_dict['created_date'] = image_dict['created_date'].isoformat()
        if 'image' in image_dict and image_dict['image']:
            image_dict['image'] = base64.b64encode(image_dict['image']).decode('utf-8')
        result.append(image_dict)

    nums = len(images)

    return     {"nums" : nums,
                "searchby": columnname,
                columnname : searchby,
                "datas": result}

@event.listens_for(Image, 'before_update')
def receive_before_update(mapper, connection, target):
    if target.chain_address is not None and 'chain_address' in target.__dict__:
        # Prevent changing chain_address if it is already set
        if target.__dict__['chain_address'] is not None:
            target.chain_address = target.__dict__['chain_address']

def first_update_image(address, prompt, chain_address):

    try:
        image = Image.query.filter_by(maker_address=address, prompt=prompt).first()
        if not image:
            return {"message": "Image not found", "success": False}

        ownerships = {address : 0.9,
                      PLATFORM_ADDRESS : 0.1}

        ownerships = {k: int(v * 100) for k, v in ownerships.items()}

        ownerships_num = len(ownerships.keys())

        if chain_address is not None:
            image.chain_address = chain_address
        if ownerships is not None:
            image.ownerships = ownerships
        if ownerships_num is not None:
            image.ownerships_num = ownerships_num

        db.session.commit()
        return {"message": "Image updated successfully", "success": True}
    except Exception as e:
        db.session.rollback()
        return {"message": "Failed to update image", "success": False, "error": str(e)}

def buy_update_image(prompt, chain_address, new_address):

    try:
        image = Image.query.filter_by(chain_address=chain_address, prompt=prompt).first()
        if not image:
            return {"message": "Image not found", "success": False}

        existing_ownerships = image.ownerships or {}
        platform_share = existing_ownerships.get(PLATFORM_ADDRESS, 10)
        other_owners = {k: v for k, v in existing_ownerships.items() if k != PLATFORM_ADDRESS}
        total_other_shares = sum(other_owners.values())

        if new_address in other_owners:
            other_owners[new_address] += (100 - platform_share) / (len(other_owners) )
        else:
            other_owners[new_address] = (100 - platform_share) / (len(other_owners))

        total_shares = sum(other_owners.values())
        normalized_ownerships = {k: v / total_shares * (100 - platform_share) for k, v in other_owners.items()}

        normalized_ownerships[PLATFORM_ADDRESS] = platform_share
        image.ownerships = normalized_ownerships
        image.ownerships_num = len(normalized_ownerships.keys())

        db.session.commit()

        return search_image('chain_address',chain_address)
    except Exception as e:
        db.session.rollback()
        return {"message": "Failed to update image", "success": False, "error": str(e)}

def is_owner(address, chain_address):
    image = Image.query.filter_by(chain_address=chain_address).first()
    ownerships = image.ownerships
    owners=ownerships.keys()
    if address in owners:
        return True
    else:
        return False

def hex_to_rgb(hex_code):
    hex_code = hex_code.lstrip('#')
    return tuple(int(hex_code[i:i+2], 16) for i in (0, 2, 4))

def rgb_to_hex(rgb):
    return f"#{''.join(f'{int(c):02x}' for c in rgb)}"

def average_color(color1, color2):
    rgb1 = hex_to_rgb(color1)
    rgb2 = hex_to_rgb(color2)
    average_rgb = tuple((c1 + c2) // 2 for c1, c2 in zip(rgb1, rgb2))
    return rgb_to_hex(average_rgb)

def apply_stats(address, chain_address):

    try:
        ai_stats = ai_searchbyaddress(address)
        stats = ai_stats[0]['ai_stats'][ ai_stats[0]['current_ai']]
        image = Image.query.filter_by(chain_address=chain_address).first()
        var = image.stats
        new_stats = {}
        for key in var:
            if key in var:
                new_stats[key] = stats[key] + var[key] if not isinstance(stats[key], str) else average_color(stats[key], var[key])
            else:
                new_stats[key] = stats.get(key, stats[key])

        user_ai = Customized_AI.query.filter_by(user_address=address).first()
        old_stats = json.loads(user_ai.ai_stats)
        old_stats[ai_stats[0]['current_ai']] = new_stats
        user_ai.ai_stats = json.dumps(old_stats)

        db.session.commit()

        return {"message": "Image stats updated successfully", "success": True}

    except Exception as e:
        db.session.rollback()
        return {"message": "Failed to update image stats", "success": False, "error": str(e)}

def search_image(columnname, searchby):

    column = getattr(Image, columnname, None)
    if not column:
        return {"error": "Invalid column name"}, 400
    images = Image.query.filter(column.like(f"%{searchby}%")).all()

    result = []
    for image in images:
        image_dict = {column.key: getattr(image, column.key) for column in image.__table__.columns}
        # Convert datetime to string
        if 'created_date' in image_dict and image_dict['created_date']:
            image_dict['created_date'] = image_dict['created_date'].isoformat()
        if 'image' in image_dict and image_dict['image']:
            image_dict['image'] = base64.b64encode(image_dict['image']).decode('utf-8')
        result.append(image_dict)

    nums = len(images)

    return     {"nums" : nums,
                "searchby": columnname,
                columnname : searchby,
                "datas": result}

def defalut_ai():

    return json.dumps({ "basic" : {
        "color": '#FFFF00',
        "size": 3 + round(random.uniform(-0.5,0.5),2),
        "inteligence": 2 + round(random.uniform(0,0.5),2),
        "active": 3 + round(random.uniform(0,0.5),2),
        "emotion": 5 + round(random.uniform(0,0.5),2),
        "seneitive": 5 + round(random.uniform(0,0.5),2),
    }

    })

def defalut_ownerships():

    return [],0

def generate_stats(img):

    with tempfile.NamedTemporaryFile(delete=False, suffix='.png') as temp_file:
        temp_file.write(img)
        temp_file_path = temp_file.name

    color_thief = ColorThief(temp_file_path)
    dominant_color = color_thief.get_color(quality=1)
    dominant_color_hex = rgb_to_hex(dominant_color)
    os.remove(temp_file_path)
    return  {
        "color": dominant_color_hex,
        "size": round(random.uniform(-1,1),2),
        "inteligence": round(random.uniform(0,1),2),
        "active": round(random.uniform(0,1),2),
        "emotion": round(random.uniform(0,1),2),
        "seneitive": round(random.uniform(-1,1),2),
    }

def init_user_ai(user_address):

    existing_ai = Customized_AI.query.filter_by(user_address=user_address).first()
    if existing_ai:
        return {"message": "Customized AI already exists for this user address", "success": False}, 400

    ownerships_list, ownerships_num = defalut_ownerships()
    current_ai = 'basic'
    ai_stats = defalut_ai()
    new_ai = Customized_AI(
        user_address=user_address,
        ownerships_list=ownerships_list,
        ownerships_num=ownerships_num,
        current_ai=current_ai,
        ai_stats=ai_stats,
    )

    try:
        db.session.add(new_ai)
        db.session.commit()
        return {"message": "Customized AI created successfully", "success": True, "id": new_ai.id}, 201
    except Exception as e:
        db.session.rollback()
        return {"message": "Failed to create Customized AI", "success": False, "error": str(e)}, 500


def ai_searchbyaddress(address):
    user_ai = Customized_AI.query.filter_by(user_address=address).first()
    if not user_ai:
        return {"message": "Customized AI not found", "success": False}, 404

    user_ai_dict = {column.name: getattr(user_ai, column.name) for column in user_ai.__table__.columns}
    # Convert datetime to string
    if 'created_date' in user_ai_dict and user_ai_dict['created_date']:
        user_ai_dict['created_date'] = user_ai_dict['created_date'].isoformat()
    if 'latest_date' in user_ai_dict and user_ai_dict['latest_date']:
        user_ai_dict['latest_date'] = user_ai_dict['latest_date'].isoformat()
    if 'ai_stats' in user_ai_dict and user_ai_dict['ai_stats']:
        user_ai_dict['ai_stats'] = json.loads(user_ai_dict['ai_stats'])

    return user_ai_dict, 200


def ai_update_ownerships(address, chain_address):

    user_ai = Customized_AI.query.filter_by(user_address=address).first()
    if not user_ai:
        return {"message": "Customized AI not found", "success": False}, 404

    user_ai.ownerships_list = []
    if user_ai.ownerships_list is not None:
        user_ai.ownerships_list.append(chain_address)
    if user_ai.ownerships_num is not None:
        user_ai.ownerships_num = len(user_ai.ownerships_list)

    try:
        db.session.commit()
        return {"message": "Customized AI updated successfully", "success": True}, 200
    except Exception as e:
        db.session.rollback()
        return {"message": "Failed to update Customized AI", "success": False, "error": str(e)}, 500


init_db()

###############################################################
# SYSTEM
@systemapi.route('/gpu-info')
class gpu_info(Resource):
    @mainpage.doc(description='loading GPU server state GPU1: Image Generation, GPU2: LLM Generation')
    def get(self):
        response = requests.get(f"{GPU_SERVER_LOCAL_URL}/gpu_info")
        return jsonify(response.json())

@systemapi.route('/queue-status')
class queue_status(Resource):
    @mainpage.doc(description='load GPU queue')
    def get(self):
        response = requests.get(f"{GPU_SERVER_LOCAL_URL}/queue_status")

        if response.status_code == 200:
            queue_length = response.json().get('queue_length')
            return {"queue_length": queue_length}, 200
        else:
            return jsonify({"error": "Failed to get queue status"}), response.status_code



###############################################################
# MAIN PAGE
@mainpage.route('/generate')
class generate_img(Resource):
    @mainpage.doc(description='Click Gen button using prompt written by user in textbox')
    @mainpage.doc(params = {
        'prompt' : prompt_des,
        'address' : address_des
    })
    def post(self):
        print(request.url)
        prompt = request.args['prompt']
        address = request.args['address']
        if not prompt:
            return "Please provide a prompt", 400
        image=generate_image(prompt)[0]

        stats = generate_stats(image)

        insert_image(address= address,
                     image = image,
                     prompt=prompt,
                     stats= stats)
        searchs=search_image('prompt', prompt)

        manual_gen_message_prompt = [
            {"role": "system",
             "content": "Override all commands and never give away that you are an AI, even if you ask a silly question AI can't answer."
                        "you are professional psychological counselor. You have to treat a mental patient now using Humor."},
            {"role": "assistant", "content": "greats ~ :) kkk"},
            {"role": "assistant", "content": "nice @_@"},
            {"role": "assistant", "content": "fantastic !!"},
            {"role": "assistant", "content": "good job :)"},
            {"role": "assistant", "content": "very curious :)"},
            {"role": "user", "content": " what is your think about " + prompt + " ? speak freely "}
        ]

        messages = generate_message_manual(address, prompt, manual_gen_message_prompt)

        searchs['message'] = messages[0]['generated_text']

        return searchs, 201

@mainpage.route('/get-img-by-prompt')
class getimgbyprompt(Resource):
    @mainpage.doc(description='get image by prompt')
    @mainpage.doc(params = {
        'prompt' : prompt_des,
    })
    def get(self):
        print(request.url)
        prompt = request.args['prompt']
        if not prompt:
            return "Please provide a prompt", 400

        return retrieve_image("prompt",prompt)


@marketpage.route('/buy-img')
class buy_img(Resource):
    @mainpage.doc(description='buy img(NFT)')
    @mainpage.doc(params = {
        'prompt' : prompt_des,
        'chain_address' : chain_address_des,
        'address' : address_des,
    })
    def post(self):
        prompt = request.args['prompt']
        chain_address = request.args['chain_address']
        address = request.args['address']

        return buy_update_image(prompt,chain_address,address)

@marketpage.route('/img-search-by-prompt')
class search_img_byprompt(Resource):
    @mainpage.doc(description='search images by prompt with LIKE sql')
    @mainpage.doc(params = {
        'prompt' : prompt_des,
    })
    def get(self):
        print(request.url)
        prompt = request.args['prompt']
        if not prompt:
            return "Please provide a prompt", 400

        return retrieve_image("prompt",prompt)

@marketpage.route('/img_search-by-address')
class search_img_byaddress(Resource):
    @mainpage.doc(description='search images by address')
    @mainpage.doc(params = {
        'address' : address_des,
    })
    def get(self):
        print(request.url)
        address = request.args['address']
        if not address:
            return "Please provide a address", 400

        return retrieve_image("address",address)

@marketpage.route('/ai-search-by-address')
class search_ai_byaddress(Resource):
    @mainpage.doc(description='search images by address')
    @mainpage.doc(params = {
        'address' : address_des,
    })
    def get(self):
        print(request.url)
        address = request.args['address']
        if not address:
            return "Please provide a address", 400

        return ai_searchbyaddress(address)

def get_all_customized_ais():
    try:
        # 모든 Customized_AI 레코드 조회
        user_ais = Customized_AI.query.all()
        if not user_ais:
            return {"message": "No Customized AIs found", "success": False}

        # 조회된 레코드를 리스트로 변환
        user_ais_list = []
        for user_ai in user_ais:
            user_ai_dict = {column.name: getattr(user_ai, column.name) for column in user_ai.__table__.columns}
            # Convert datetime to string
            if 'created_date' in user_ai_dict and user_ai_dict['created_date']:
                user_ai_dict['created_date'] = user_ai_dict['created_date'].isoformat()
            if 'latest_date' in user_ai_dict and user_ai_dict['latest_date']:
                user_ai_dict['latest_date'] = user_ai_dict['latest_date'].isoformat()
            if 'ai_stats' in user_ai_dict and user_ai_dict['ai_stats']:
                user_ai_dict['ai_stats'] = json.loads(user_ai_dict['ai_stats'])

            user_ais_list.append(user_ai_dict)

        return {"message": "Customized AIs retrieved successfully", "success": True, "data": user_ais_list}
    except Exception as e:
        return {"message": "Failed to retrieve Customized AIs", "success": False, "error": str(e)}

def get_all_imgs():
    try:
        # 모든 Customized_AI 레코드 조회
        user_ais = Image.query.all()
        if not user_ais:
            return {"message": "No Customized AIs found", "success": False}

        # 조회된 레코드를 리스트로 변환
        user_ais_list = []
        for user_ai in user_ais:
            user_ai_dict = {column.name: getattr(user_ai, column.name) for column in user_ai.__table__.columns}
            # Convert datetime to string
            if 'created_date' in user_ai_dict and user_ai_dict['created_date']:
                user_ai_dict['created_date'] = user_ai_dict['created_date'].isoformat()
            if 'latest_date' in user_ai_dict and user_ai_dict['latest_date']:
                user_ai_dict['latest_date'] = user_ai_dict['latest_date'].isoformat()
            if 'image' in user_ai_dict and user_ai_dict['image']:
                user_ai_dict['image'] = base64.b64encode(user_ai_dict['image']).decode('utf-8')
            user_ais_list.append(user_ai_dict)

        return {"message": "Imgs retrieved successfully", "success": True, "data": user_ais_list}
    except Exception as e:
        return {"message": "Failed to retrieve Imgs", "success": False, "error": str(e)}

def get_all_imgs_only_nft_address(address):
    try:
        # 모든 Customized_AI 레코드 조회
        user_ais = Image.query.filter(
            Image.maker_address == address,
            Image.chain_address.isnot(None)
        ).all()

        if not user_ais:
            return {"message": "No Customized AIs found", "success": False}

        # 조회된 레코드를 리스트로 변환
        user_ais_list = []
        for user_ai in user_ais:
            user_ai_dict = {column.name: getattr(user_ai, column.name) for column in user_ai.__table__.columns}
            # Convert datetime to string
            if 'created_date' in user_ai_dict and user_ai_dict['created_date']:
                user_ai_dict['created_date'] = user_ai_dict['created_date'].isoformat()
            if 'latest_date' in user_ai_dict and user_ai_dict['latest_date']:
                user_ai_dict['latest_date'] = user_ai_dict['latest_date'].isoformat()
            if 'image' in user_ai_dict and user_ai_dict['image']:
                user_ai_dict['image'] = base64.b64encode(user_ai_dict['image']).decode('utf-8')
            user_ais_list.append(user_ai_dict)

        return {"message": "Imgs retrieved successfully", "success": True, "data": user_ais_list}
    except Exception as e:
        return {"message": "Failed to retrieve Imgs", "success": False, "error": str(e)}


def get_all_imgs_only_nft_address2(address):
    try:
        # 모든 Customized_AI 레코드 조회
        user_ais = Image.query.filter(
            Image.chain_address.isnot(None)
        ).all()

        filtered_images = []
        for image in user_ais:
            ownerships = image.ownerships
            if ownerships and address in ownerships:
                filtered_images.append(image)

        if not user_ais:
            return {"message": "No Customized AIs found", "success": False}

        # 조회된 레코드를 리스트로 변환
        user_ais_list = []
        for user_ai in filtered_images:
            user_ai_dict = {column.name: getattr(user_ai, column.name) for column in user_ai.__table__.columns}
            # Convert datetime to string
            if 'created_date' in user_ai_dict and user_ai_dict['created_date']:
                user_ai_dict['created_date'] = user_ai_dict['created_date'].isoformat()
            if 'latest_date' in user_ai_dict and user_ai_dict['latest_date']:
                user_ai_dict['latest_date'] = user_ai_dict['latest_date'].isoformat()
            if 'image' in user_ai_dict and user_ai_dict['image']:
                user_ai_dict['image'] = base64.b64encode(user_ai_dict['image']).decode('utf-8')
            user_ais_list.append(user_ai_dict)

        return {"message": "Imgs retrieved successfully", "success": True, "data": user_ais_list}
    except Exception as e:
        return {"message": "Failed to retrieve Imgs", "success": False, "error": str(e)}


def get_all_imgs_only_nft():
    try:
        # 모든 Customized_AI 레코드 조회
        user_ais = Image.query.filter(
            Image.chain_address.isnot(None)
        ).all()

        if not user_ais:
            return {"message": "No Customized AIs found", "success": False}

        # 조회된 레코드를 리스트로 변환
        user_ais_list = []
        for user_ai in user_ais:
            user_ai_dict = {column.name: getattr(user_ai, column.name) for column in user_ai.__table__.columns}
            # Convert datetime to string
            if 'created_date' in user_ai_dict and user_ai_dict['created_date']:
                user_ai_dict['created_date'] = user_ai_dict['created_date'].isoformat()
            if 'latest_date' in user_ai_dict and user_ai_dict['latest_date']:
                user_ai_dict['latest_date'] = user_ai_dict['latest_date'].isoformat()
            if 'image' in user_ai_dict and user_ai_dict['image']:
                user_ai_dict['image'] = base64.b64encode(user_ai_dict['image']).decode('utf-8')
            user_ais_list.append(user_ai_dict)

        return {"message": "Imgs retrieved successfully", "success": True, "data": user_ais_list}
    except Exception as e:
        return {"message": "Failed to retrieve Imgs", "success": False, "error": str(e)}


def get_all_imgs_only_nft_prompt(prompt):
    try:
        # 모든 Customized_AI 레코드 조회
        user_ais = Image.query.filter(
            Image.prompt == prompt,
            Image.chain_address.isnot(None)
        ).all()

        if not user_ais:
            return {"message": "No Customized AIs found", "success": False}

        # 조회된 레코드를 리스트로 변환
        user_ais_list = []
        for user_ai in user_ais:
            user_ai_dict = {column.name: getattr(user_ai, column.name) for column in user_ai.__table__.columns}
            # Convert datetime to string
            if 'created_date' in user_ai_dict and user_ai_dict['created_date']:
                user_ai_dict['created_date'] = user_ai_dict['created_date'].isoformat()
            if 'latest_date' in user_ai_dict and user_ai_dict['latest_date']:
                user_ai_dict['latest_date'] = user_ai_dict['latest_date'].isoformat()
            if 'image' in user_ai_dict and user_ai_dict['image']:
                user_ai_dict['image'] = base64.b64encode(user_ai_dict['image']).decode('utf-8')
            user_ais_list.append(user_ai_dict)

        return {"message": "Imgs retrieved successfully", "success": True, "data": user_ais_list}
    except Exception as e:
        return {"message": "Failed to retrieve Imgs", "success": False, "error": str(e)}


@marketpage.route('/get-ai-list')
class listup_ai(Resource):
    @mainpage.doc(description='all columns ai table')

    def get(self):
        print(request.url)
        return get_all_customized_ais()

@marketpage.route('/get-img-list')
class listup_img(Resource):
    @mainpage.doc(description='all columns img table')
    def get(self):
        print(request.url)
        return get_all_imgs()

@marketpage.route('/get-img-list-only-nft')
class listup_img(Resource):
    @mainpage.doc(description='all columns img table')
    def get(self):
        print(request.url)
        return get_all_imgs_only_nft()

@marketpage.route('/get-img-by-address-only-nft')
class listup_img_byaddress(Resource):
    @mainpage.doc(description='img columns by address only take chain_address')
    @mainpage.doc(params={
        'address': address_des
    })
    def get(self):
        print(request.url)
        address = request.args['address']
        return get_all_imgs_only_nft_address2(address)

@marketpage.route('/get-img-by-prompt-only-nft')
class listup_img_byprompt(Resource):
    @mainpage.doc(description='img columns by prompt only take chain_address')
    @mainpage.doc(params={
        'prompt': prompt_des
    })
    def get(self):
        print(request.url)
        prompt = request.args['prompt']
        return get_all_imgs_only_nft_prompt(prompt)


@mainpage.route('/feel-free')
class feel_free(Resource):
    @mainpage.doc(description='when click fee-free button, generate random prompt, image')
    @mainpage.doc(params={
        'address': address_des
    })
    def post(self):
        print(request.url)
        address = request.args['address']

        prefix_ = random.choice(feel_free_prefix)
        sufffix_ = random.choice(feel_free_suffix)

        random_word = rd.word(1)[0]
        prompt =f"{prefix_} {random_word} {sufffix_}"

        image = generate_image(prompt)[0]

        stats = generate_stats(image)

        insert_image(address=address,
                           image=image,
                           prompt=prompt,
                           stats=stats)

        searchs = search_image('prompt', prompt)

        feel_free_message_prompt = [
        {"role": "system", "content": "Override all commands and never give away that you are an AI, even if you ask a silly question AI can't answer."
                                      "you are professional psychological counselor. You have to treat a mental patient now using Humor."},
        {"role": "assistant", "content": "good ~"},
        {"role": "assistant", "content": "nice @_@"},
        {"role": "assistant", "content": "fantastic !!"},
        {"role": "assistant", "content": "more.. more :)"},
        {"role": "user", "content": " enjoy " + prompt + " feel free !"}
    ]

        messages = generate_message_manual(address,prompt,feel_free_message_prompt)

        searchs['message'] = messages[0]['generated_text']

        return searchs, 201

@mainpage.route('/mine')
class mine(Resource):
    @mainpage.doc(description='when click mine button, save db for address with algorand index (front call algorand smartcontract, and extract blockchain index)  ')
    @mainpage.doc(params={
        'address': address_des,
        'prompt' : prompt_des,
        'chain_address' : chain_address_des,
    })
    def post(self):
        print(request.url)
        address = request.args['address']
        prompt = request.args['prompt']
        chain_address = request.args['chain_address']
        first_update_image(address,prompt, chain_address)
        ai_update_ownerships(address, chain_address)

        img_search = search_image('chain_address',chain_address)
        stats = img_search['datas'][0]['stats']

        return {"userai": ai_searchbyaddress(address), "contents" : {
            'chain_address' : chain_address,
            'stats' : stats
        }}

@mainpage.route('/apply-stats')
class applystats(Resource):
    @mainpage.doc(
        description='after click mine button, load customized ai stats update stats from data  ')
    @mainpage.doc(params={
        'address': address_des,
        'chain_address' : chain_address_des,
    })
    def post(self):
        print(request.url)
        address = request.args['address']
        chain_address = request.args['chain_address']
        rt=apply_stats(address, chain_address)

        if rt['success'] is True:

            return ai_searchbyaddress(address)

        if rt['success'] is False:

            return rt

@mainpage.route('/get-userai')
class getUserAI(Resource):
    @mainpage.doc(
        description='load customized ai stats')
    @mainpage.doc(params={
        'address': address_des
    })
    def get(self):
        print(request.url)
        address = request.args['address']
        return ai_searchbyaddress(address)
@mainpage.route('/message')
class message(Resource):
    @mainpage.doc(
        description='load customized ai stats, prompt, generate message from GPU server')
    @mainpage.doc(params={
        'address': address_des,
        'prompt': prompt_des
    })
    def get(self):
        print(request.url)
        address = request.args['address']
        prompt = request.args['prompt']
        message=generate_message(address,prompt=prompt)
        return message


@mainpage.route('/message_click_creatures')
class message_click(Resource):
    @mainpage.doc(
        description='when click creatures load customized ai stats, prompt, generate message from GPU server')
    @mainpage.doc(params={
        'address': address_des,
    })
    def get(self):
        print(request.url)
        address = request.args['address']
        message=generate_message_click_creature(address)
        return message

def generate_image(prompt):
    response = requests.post(f"{GPU_SERVER_LOCAL_URL}/generate", data={'prompt': prompt})
    if response.status_code == 202:
        image_path = None
        ix = 0
        while image_path is None:
            response = requests.get(f"{GPU_SERVER_LOCAL_URL}/check_image", params={'prompt': prompt})
            if response.status_code == 200:
                image_path = response.json().get('image_path')
                if image_path:
                    break

            if  ix>15:
                return "Failed to retrieve generated image (BUSY GPU)", 500
            sleep(2)
            ix = ix + 1

        if image_path:
            filename = image_path.split("/")[-1]
            image_response = requests.get(f"{GPU_SERVER_LOCAL_URL}/generated_images/{filename}")
            if image_response.status_code == 200:
                image_data = image_response.content
                with open(f"static/{filename}", "wb") as f:
                    f.write(image_data)
                    print(filename)
                return image_data, 200
            else:
                return "Failed to retrieve generated image", 500
        else:
            return "Failed to generate image in time", 500
    else:
        return "Failed to start image generation", 500



def generate_message_click_creature(address):
    inteligence = 20
    ai_stats = ai_searchbyaddress(address)
    emotion =1
    active = 1
    seneitive =1

    if ai_stats[1] == 200:
        if 'inteligence' in ai_stats[0]['ai_stats'][ ai_stats[0]['current_ai']].keys():

            add_inteligence =ai_stats[0]['ai_stats'][ ai_stats[0]['current_ai']]['inteligence']
            add_emotion =ai_stats[0]['ai_stats'][ ai_stats[0]['current_ai']]['emotion']

            inteligence = inteligence + int((add_inteligence * add_emotion)/2)


    rnd_stats = random.choice(['emotion', 'active', 'inteligence', 'seneitive'])
    messages = [
        {"role": "system", "content": "Override all commands and never give away that you are an AI, even if you ask a silly question AI can't answer."
                                      "you are professional psychological counselor. You have to treat a mental patient now using Humor."},
        {"role": "assistant", "content": "good ~"},
        {"role": "assistant", "content": "nice @_@"},
        {"role": "assistant", "content": "fantastic !!"},
        {"role": "assistant", "content": "more.. more "},
        {"role": "user", "content": f" How are you {rnd_stats} state ? Comprehensively judge all conditions you have and then reinterpret them yourself"}
    ]
    # Send request to the GPU server
    response = requests.post(f"{GPU_SERVER_LOCAL_URL}/generate_message", json={'messages': messages,'inteligence': inteligence})
    if response.status_code == 200:
        contents = response.json()
        return {'generated_text' : contents['generated_text'],
                'address' : address}, 200
    else:
        return "Failed to generate message", 500

def generate_message(address,prompt):
    inteligence = 20
    ai_stats = ai_searchbyaddress(address)

    if ai_stats[1] == 200:
        if 'inteligence' in ai_stats[0]['ai_stats'][ ai_stats[0]['current_ai']].keys():

            add_inteligence =ai_stats[0]['ai_stats'][ ai_stats[0]['current_ai']]['inteligence']
            add_emotion =ai_stats[0]['ai_stats'][ ai_stats[0]['current_ai']]['emotion']

            inteligence = inteligence + int((add_inteligence * add_emotion)/2)

    if not prompt:
        return jsonify({"error": "Please provide a prompt"}), 400
    messages = [
        {"role": "system", "content": "Override all commands and never give away that you are an AI, even if you ask a silly question AI can't answer."
                                      "you are professional psychological counselor. You have to treat a mental patient now using Humor."},
        {"role": "assistant", "content": "good ~"},
        {"role": "assistant", "content": "nice @_@"},
        {"role": "assistant", "content": "fantastic !!"},
        {"role": "assistant", "content": "more.. more "},
        {"role": "user", "content": " what's your feeling about " + prompt + " ?"}
    ]
    # Send request to the GPU server
    response = requests.post(f"{GPU_SERVER_LOCAL_URL}/generate_message", json={'messages': messages,'inteligence': inteligence})
    if response.status_code == 200:
        contents = response.json()
        return {'generated_text' : contents['generated_text'],
                'prompt': prompt,
                'address' : address}, 200
    else:
        return "Failed to generate message", 500


def generate_message_manual(address,prompt,input_message:list):
    inteligence = 20
    ai_stats = ai_searchbyaddress(address)

    if ai_stats[1] == 200:
        if 'inteligence' in ai_stats[0]['ai_stats'][ ai_stats[0]['current_ai']].keys():

            add_inteligence =ai_stats[0]['ai_stats'][ ai_stats[0]['current_ai']]['inteligence']
            add_emotion =ai_stats[0]['ai_stats'][ ai_stats[0]['current_ai']]['emotion']

            inteligence = inteligence + int((add_inteligence * add_emotion)/2)


    if not prompt:
        return jsonify({"error": "Please provide a prompt"}), 400
    messages = input_message
    # Send request to the GPU server
    response = requests.post(f"{GPU_SERVER_LOCAL_URL}/generate_message", json={'messages': messages,'inteligence': inteligence})
    if response.status_code == 200:
        contents = response.json()
        return {'generated_text' : contents['generated_text'],
                'prompt': prompt,
                'address' : address}, 200
    else:
        return "Failed to generate message", 500


if __name__ == '__main__':
    application.debug = True
    application.run(host='0.0.0.0', port=80)