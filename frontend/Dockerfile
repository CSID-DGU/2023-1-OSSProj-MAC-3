# Base image
FROM node:latest

# 앱 디렉토리 생성
WORKDIR /app

# 앱 종속성 설치
COPY package*.json ./
RUN npm install

# 앱 소스 코드 복사
COPY . .

# 앱 빌드
RUN npm run build

# 빌드된 앱 실행
CMD ["npm", "start"]