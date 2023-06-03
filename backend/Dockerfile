FROM openjdk:11-jdk

# 작업 디렉토리 설정
WORKDIR /app

# 필요한 패키지 설치
RUN apt-get update && apt-get install -y dos2unix

# Gradle 파일 복사
COPY . .

# 파일 변환
RUN find . -type f -exec dos2unix {} \;

# 애플리케이션 빌드
RUN ./gradlew --no-daemon dependencies
RUN ./gradlew --no-daemon build -x test

# 애플리케이션 실행
CMD ["java", "-jar", "/app/build/libs/demo-0.0.1-SNAPSHOT.jar"]




