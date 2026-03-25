# ビルド用ステージ
FROM maven:3.9.3-eclipse-temurin-17 AS build
WORKDIR /app

# pom.xml を先にコピーして依存解決キャッシュを効かせる
COPY backend/pom.xml .

# ソースコードをコピー
COPY backend/src ./src

# Maven ビルド（テストスキップで高速化）
RUN mvn clean package -DskipTests

# 実行用ステージ
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# ビルド成果物の jar をコピー
COPY --from=build /app/target/*.jar app.jar

# ポート公開
EXPOSE 8080

# 起動コマンド
ENTRYPOINT ["java", "-jar", "app.jar", "--server.port=${PORT}"]