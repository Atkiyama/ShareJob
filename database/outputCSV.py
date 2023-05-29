import os
import json
import csv

# JSONフォルダのパス
json_folder = "json"

# CSVフォルダのパス
csv_folder = "csv"

# CSVフォルダが存在しない場合は作成
if not os.path.exists(csv_folder):
    os.makedirs(csv_folder)

# JSONフォルダ内の全てのファイルを処理
for file_name in os.listdir(json_folder):
    # ファイルの拡張子が.jsonであることを確認
    if file_name.endswith(".json"):
        # JSONファイルのパス
        json_file_path = os.path.join(json_folder, file_name)
        
        # CSVファイルのパス
        csv_file_path = os.path.join(csv_folder, file_name.rsplit('.', 1)[0] + '.csv')
        
        # JSONファイルからデータを読み込む
        with open(json_file_path, 'r') as json_file:
            data = json.load(json_file)
        
        # CSVファイルにデータを書き込む
        with open(csv_file_path, 'w', newline='') as csv_file:
            writer = csv.writer(csv_file)
            
            # ヘッダー行を書き込む
            writer.writerow(data[0].keys())
            
            # データ行を書き込む
            for row in data:
                writer.writerow(row.values())

        # CSVファイルの内容を読み込んで[]と'を削除
        with open(csv_file_path, 'r') as csv_file:
            csv_data = csv_file.read()
            csv_data = csv_data.replace('[', '').replace(']', '').replace("'", "")
        
        # CSVファイルを上書きして[]と'を削除した内容を書き込む
        with open(csv_file_path, 'w', newline='') as csv_file:
            csv_file.write(csv_data)

        print("CSVファイルの出力が完了しました。ファイル名:", csv_file_path)
