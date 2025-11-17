# Szamlazz.hu

## [DEMO SITE](http://szamlazzhu.sherpas.hu:4200)

## Requirements:
- [asdf](https://asdf-vm.com/)

Backend start:
```bash
cd backend
./mvnw spring-boot:run
```

Frontend start:
```bash
cd frontend
npm start
```

## Demo environment

### Deployment

- define szamlazzhu-demo-server host in ~/.ssh/config
- run `./deploy.sh` - it will build docker images, upload to remote host and start services with docker compose

Backend: http://szamlazzhu.sherpas.hu:8080
Frontend: http://szamlazzhu.sherpas.hu:4200

## Hogyan készült?

- mkdir szamlazzhu-hw
- .tool-versions - java és nodejs specifikálása és telepítése
- az Google Docs doksit pdf-be exportaltam
- Claude CLI-t használtam végig Sonnet modellel
- prompt: készítsen high qualitz CLAUDE.md filet a doksiból
- manual: https://start.spring.io/ generáltam a specben leírtnak megfelelő Spring Boot projektet
- manual: npx -p @angular/cli ng new frontend // ezzel generáltam ki az új Angular projektet
- prompt: készítsen tervet a backend megvalósításhoz és implementálja
- prompt: frontend implementálás, double check specifikáció
- manual testing
- deployment előkészítés - ez tartott a legtovább, mert először render.com-ra szerettem volna kitenni + GH Pages-re, de bonyolulttá tette a dolgokat
  aztán úgy döntöttem, hogy a legegyszerűbb lesz egy már futó docker hostomra kitenni
- dockerize backend + frontent + reverse proxy backend. CORS origin settings a backend oldalon
- prompt: simplify frontend CSS + TS code
- manual: a design finomhangolása, hogy valamennyire hasonlítson a szamlazz.hu designra. Bocsi, de nem öltem bele órákat, hogy minden pontosan úgy nézzen ki.

Idők: (vibe) coding ~ 1h, deployment ~ 1.5h