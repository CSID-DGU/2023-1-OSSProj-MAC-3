# 베이스 이미지로 공식 MySQL 8.0 이미지 사용
FROM mysql:5.7

# 환경 변수 설정
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=eclass

# 초기화 스크립트 복사
COPY init.sql /docker-entrypoint-initdb.d/

# 컨테이너 실행 시 MySQL 서버를 시작합니다.
CMD ["mysqld"]


