# ビルド用ステージ
FROM maven:3.9.3-eclipse-temurin-17 AS build
WORKDIR /app

COPY backend/pom.xml .
COPY backend/src ./src

RUN mvn clean package -DskipTests

# 実行用ステージ
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

# ★ここが重要（sh -cで環境変数展開）
ENTRYPOINT ["sh", "-c", "java -jar app.jar --server.port=$PORT"]