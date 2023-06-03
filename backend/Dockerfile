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