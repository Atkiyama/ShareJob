# ShareJob

## 概要

本アプリケーションは就職活動をするユーザ向けに作られたアプリケーションで主に以下のことができます。

- 企業ごとに就職活動の状況を記録できる

また、本リポジトリはアプリケーションのドキュメントと動作確認用のスクリプト等をまとめたものになります。使用するには使用方法の項を参考に別リポジトリのリポジトリを展開してください。

## 技術スタック

以下の技術スタックを用いています。

- バックエンド
  - node.js(Typescript)
  - express
- フロントエンド
  - React
- データベース
  - MongoDB
    - 本番環境 [MongoDB atlas](https://www.mongodb.com/ja-jp/atlas/database)
    - テスト環境 ローカル MongoDB

## 動作環境

- MAC OS Ventura 13.4.1
- node v16.17.0
- npm 8.15.0

### テスト環境

- Python 3.9.7
- MongoDB shell version v5.0.17

```json

Build Info: {
    "version": "5.0.17",
    "gitVersion": "197466e20bef76222c1ad85204633163beba3009",
    "modules": [],
    "allocator": "system",
    "environment": {
    "distarch": "x86_64",
    "target_arch": "x86_64"
    }
}
```

## 使用方法

1.まずは本リポジトリをクローンしたら、ShareJob ディレクトリに移動し、[ShareJob-backend](https://github.com/Atkiyama/ShareJob-backend)と[ShareJob-frontend](https://github.com/Atkiyama/ShareJob-frontend)をクローンしてください

```shell
$ git clone https://github.com/Atkiyama/ShareJob.git
$ cd ShareJob
$ git clone https://github.com/Atkiyama/ShareJob-backend.git
$ git clone https://github.com/Atkiyama/ShareJob-frontend.git
```

2.各リポジトリのルートディレクトリに.env ファイルを追加して以下の環境変数を設定してください
backend

```TXT
SECRET_KEY={MongoDB atlasのシークレットキー}
SALT_ROUNDS={暗号化に使うパラメータ、数字を設定してください}
MONGODB_ATLAS={MongoDB Atlasの接続先、ローカルのテスト環境の場合はmongodb://127.0.0.1/shareJob}
```

frontend

```TXT
REACT_APP_BASE_URL={バックエンドのベースとなるURL(ローカル環境の場合はhttp://localhost:5000/)}
```

以下のコマンドでそれぞれのサーバを起動してください

backend

```shell
$ cd ShareJob/backend
$ node src/index.js
```

frontend

```shell
$ cd ShareJob/frontend
$ npm start
```

frontend をビルドする場合

```shell
$ cd ShareJob/frontend
$ npm run build
```

ベース URL にアクセスするとトップ画面が表示されます

## テスト環境の環境構築

以下の環境が必要になります。

- python3 系
- MongoDB

  1.database ディレクトリに移動し以下のコマンドを実行すると MongoDB に shareJob データベースが書き込まれます。
  追加されるデータは json ディレクトリに記載されています

```shell
$ cd ShareJob/database
$ python dbReset.py
```

## 今後の改良予定

本アプリのメイン機能である就職活動の状況を共有できる機能を開発予定です
