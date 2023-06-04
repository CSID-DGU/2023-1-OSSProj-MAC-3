
#멀티 플랫폼을 이용하기 위한 설정
FROM openjdk:11-jdk
EXPOSE 8080
RUN apt-get update

# jar 파일로 만들어라
ARG JAR_FILE=build/libs/demo-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]


#WORKDIR /app
#
## gradle 파일이 변경시 새롭개 의존 패키지를 다운받게함.
#COPY gradlew build.gradle settings.gradle /build/
#COPY gradle ./gradle
#
#RUN dos2unix gradlew && chmod +x gradlew
#RUN ./gradlew --no-daemon dependencies
#
#COPY src ./src
#
#RUN find . -type f -name "*.gradle" -exec dos2unix {} \;
#RUN find . -type f -name "*.java" -exec dos2unix {} \;
#
#RUN ./gradlew --no-daemon build -x test
#
#RUN mkdir -p target && (cd build/libs && cp earthquake-alert-spring-0.0.1-SNAPSHOT.jar ../../target/earthquake-alert-spring.jar)
#
#CMD java -jar target/earthquake-alert-spring.jar
# FROM openjdk:11-jdk

# # 작업 디렉토리 설정
# WORKDIR /app

# # 필요한 패키지 설치
# RUN apt-get update && apt-get install -y dos2unix

# # Gradle 파일 복사
# COPY . .

# # 파일 변환
# RUN find . -type f -exec dos2unix {} \;

# # 애플리케이션 빌드
# RUN ./gradlew --no-daemon dependencies
# RUN ./gradlew --no-daemon build -x test

# # 애플리케이션 실행
# CMD ["java", "-jar", "/app/build/libs/demo-0.0.1-SNAPSHOT.jar"]

