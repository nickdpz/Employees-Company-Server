# Usar  imagen de nodejs
FROM node:lts-alpine as builder
# Crear carpeta de trabajo
RUN mkdir -p /usr/src/app
# seleccionar carpeta de trabajo
WORKDIR /usr/src/app
# copiar archivos de packetes
COPY ["package.json", "package-lock.json", "/usr/src/"]
# instalar blibliotecas
RUN npm install --only=production
# copia el resto de archivos
COPY . .
# instala dependecias de desarrollo para test
RUN npm install --only=development
# corre con test usuarios
RUN npm run test
# corre con test zonas

# Usar  imagen de nodejs
FROM node:lts-alpine
# Crear carpeta de trabajo
RUN mkdir -p /usr/src/app
# seleccionar carpeta de trabajo
WORKDIR /usr/src/app
# copiar archivos de packetes
COPY ["package.json", "package-lock.json", "/usr/src/"]
# instalar blibliotecas
RUN npm install --only=production
# expone puerto 3000
EXPOSE 3000
# copia el resto de archivos
COPY --from=builder . .
# Inicia el servidor con node 
CMD npm start