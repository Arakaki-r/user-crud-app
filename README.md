# User Management API

Spring Bootで開発したユーザー管理REST APIです。
ユーザーのCRUD操作、入力バリデーション、例外ハンドリング、ページネーションなどを実装しています。

保守性と拡張性を意識し、レイヤードアーキテクチャ（Controller / Service / Repository）を採用しています。

---

## 概要

Spring Bootを用いて作成したユーザー管理APIです。
実務を想定し、責務分離・例外処理の統一・DTOによるデータ分離などを意識した設計で実装しています。

---

## 設計方針

* Controllerは可能な限り薄く保つ
* ビジネスロジックはService層に集約する
* Entityは外部に公開しない
* 例外処理は共通ハンドラーで統一する
* 入力値検証はBean Validationで実施する


---

# 使用技術

* Java 17
* Spring Boot
* Maven
* MySQL
* Spring Data JPA
* Jakarta Validation
* JUnit / MockMvc
* Git / GitHub

---

# アーキテクチャ設計

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

# Controller層

* HTTPリクエストの受付
* DTOを利用しEntityの直接公開を防止
* バリデーション実施
* ビジネスロジックは持たない

---

# Service層

* ビジネスロジックを集約
* Repositoryとの橋渡し
* 業務例外のスロー

---

# Repository層

* データベースアクセスのみ担当
* Spring Data JPAを使用

---

# DTO設計

用途別にDTOを分離

* UserCreateRequest
* UserUpdateRequest
* UserResponse

Entityを直接外部公開しない設計。

---

# 例外処理

GlobalExceptionHandlerで例外を一元管理。

例

* ResourceNotFoundException
* ValidationException

---

# API仕様

| Method | Endpoint      | 内容     |
| ------ | ------------- | ------ |
| POST   | /users        | ユーザー作成 |
| GET    | /users        | ユーザー一覧 |
| GET    | /users/{id}   | 1件取得   |
| PUT    | /users/{id}   | 更新     |
| DELETE | /users/{id}   | 削除     |
| GET    | /users/search | 名前検索   |

---

# データベース

MySQLを使用。

主なカラム

* id
* name
* email

---

# プロジェクト構成

```
src/main/java/com/ryota/hello

controller
service
repository
entity
dto
mapper
exception
api
```

---

# テスト

ControllerのAPIテストを実装。

使用技術

* JUnit
* MockMvc
* Mockito

例

UserControllerTest

---

# 起動方法

### clone

git clone https://github.com/xxxxx/user-api.git

### 起動

./mvnw spring-boot:run

---

## APIドキュメント

Swagger UIでAPIを確認できます。

http://localhost:8080/swagger-ui.html

---

# 工夫した点

* DTOを用途別に分離（Create / Update）
* GlobalExceptionHandlerで例外を一元管理
* Bean Validationで入力検証
* Service層にビジネスロジックを集約
* EntityをAPIレスポンスとして公開しない設計

---

# 今後の改善予定

* SwaggerによるAPIドキュメント生成
* ログ設計の強化
* 認証機能の追加
* Docker対応
