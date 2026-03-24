# ユーザー管理アプリ（JWT認証付きフルスタック）

## 概要

Spring Boot（バックエンド）とReact（フロントエンド）で構築したユーザー管理アプリです。
JWT認証を用いたログイン機能を実装し、認証付きCRUD APIの操作が可能です。

本プロジェクトはポートフォリオとして作成し、実務を意識した設計・認証・API連携を実装しています。

---

## システム構成

```
backend  : Spring Boot（REST API + JWT認証）
frontend : React（Vite） + Axios
```

フロントエンドとバックエンドを分離した構成で開発しています。

---

## 使用技術

### Backend

* Java 17
* Spring Boot
* Spring Security
* JWT認証
* Spring Data JPA
* MySQL
* Maven
* Jakarta Validation
* JUnit / MockMvc

### Frontend

* React（Vite）
* Axios
* React Router

---

## アーキテクチャ設計

本プロジェクトは **レイヤードアーキテクチャ** を採用しています。

```
Controller
 ↓
Service
 ↓
Repository
 ↓
Entity (DB)
```

---

## 設計方針

* Controllerは可能な限り薄く保つ
* ビジネスロジックはService層に集約する
* Entityは外部に公開しない
* DTOを用いてデータを分離
* 例外処理は共通ハンドラーで統一
* 入力値検証はBean Validationで実施

---

## ディレクトリ構成

```
backend/
  ├── controller
  ├── service
  ├── repository
  ├── entity
  ├── dto
  ├── mapper
  ├── security
  └── exception

frontend/
  ├── api
  ├── components
  ├── pages
  └── services
```

---

## セキュリティ設計（JWT）

Spring SecurityとJWTを用いた認証機能を実装しています。

* `/auth/login` でトークンを発行
* JwtFilterでリクエストごとに認証チェック
* `/auth/**` は認証不要
* その他のAPIはJWT必須
* トークンの有効期限：1時間

例：

```
Authorization: Bearer xxxxx
```

---

## フロントエンド構成

* React + Viteで構築
* AxiosでAPI通信
* interceptorでJWTを自動付与
* 401エラー時に自動ログアウト
* React Routerで認証ガード実装
* ページ単位で責務分離（Login / User）

---

## 機能一覧

* ログイン（JWT認証）
* ユーザー一覧取得（ページング）
* ユーザー作成
* ユーザー更新
* ユーザー削除
* 名前検索
* ログアウト

---

## API仕様

| Method | Endpoint      | 内容          |
| ------ | ------------- | ----------- |
| POST   | /auth/login   | ログイン（JWT発行） |
| POST   | /users        | ユーザー作成      |
| GET    | /users        | ユーザー一覧取得    |
| GET    | /users/{id}   | ユーザー取得      |
| PUT    | /users/{id}   | 更新          |
| DELETE | /users/{id}   | 削除          |
| GET    | /users/search | 名前検索        |

---

## データベース

MySQLを使用

主なカラム

* id
* name
* email

---

## テスト

ControllerのAPIテストを実装

* JUnit
* MockMvc
* Mockito

---

## 起動方法

### Backend

```
cd backend
./mvnw spring-boot:run
```

### Frontend

```
cd frontend
npm install
npm run dev
```

---

## APIドキュメント

Swagger UIで確認可能

```
http://localhost:8080/swagger-ui.html
```

---

## 工夫した点

* レイヤードアーキテクチャによる責務分離
* DTOによるEntity非公開設計
* GlobalExceptionHandlerで例外を一元管理
* Bean Validationによる入力検証
* JWT認証によるセキュリティ強化
* Axios interceptorによるトークン自動付与
* 401 / 403 の認証エラーを確認済み（curlで検証）
* フロント・バックエンド分離構成で実装

---

## 今後の改善

* UI/UXの改善
* リフレッシュトークンの導入
* Docker対応
* デプロイ環境の最適化
