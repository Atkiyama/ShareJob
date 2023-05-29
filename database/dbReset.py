import os
import json
from pymongo import MongoClient

# MongoDB接続情報
client = MongoClient('localhost', 27017)
db = client['shareJob']

# JSONフォルダのパス
json_folder = "json"

# JSONフォルダ内の全てのファイルを処理
for file_name in os.listdir(json_folder):
    # ファイルの拡張子が.jsonであることを確認
    if file_name.endswith(".json"):
        # JSONファイルのパス
        json_file_path = os.path.join(json_folder, file_name)
        
        # コレクション名（ファイル名）
        collection_name = file_name.rsplit('.', 1)[0]
        
        # JSONファイルからデータを読み込む
        with open(json_file_path, 'r') as json_file:
            data = json.load(json_file)
        
        # コレクションをリセット
        db[collection_name].delete_many({})
        
        # データをコレクションに挿入
        db[collection_name].insert_many(data)

        print("データの保存が完了しました。コレクション名:", collection_name)
