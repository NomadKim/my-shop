import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as pactum from "pactum";
import { Test } from "@nestjs/testing"
import { AppModule } from "backendnestlib";
import { UserDTO } from "@my-shop/dtos";

describe("App e2e testing", () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleRef.createNestApplication();

        app.useGlobalPipes(new ValidationPipe({
            whitelist: true
        }));

        await app.init();
        await app.listen(3333);

        pactum.request.setBaseUrl("http://localhost:3333")
    });

    afterAll(() => {
        app.close();
    });

    describe("Auth Controller", () => {
        const user: UserDTO = {
            email: "qwde@sdf.com",
            password: "4324234"
        };

        describe("Sign Up", () => {
            it("No Password", () => {
                pactum
                    .spec()
                    .post("/signUp")
                    .withBody({
                        "email": user.email
                    })
                    .expectStatus(401)


            });

            it("No email", () => {
                pactum.spec().post("/signUp").withBody({
                    "password": user.password
                }).expectStatus(401);
            })

            it("Succesful signUp", ()=>{
                pactum
                .spec()
                .post("/signUp")
                .withBody({
                    "email": user.email,
                    "password": user.password
                })
                .expectStatus(201)
                .stores("authToken", "res.headers['Authorization']")
            });
        })
    });

    describe("Product Controller", () => {
        it("Get Product", async () => {
            await pactum.spec().get("/products").withHeaders({
                "Authorization": "headerAuth"
            }).expectStatus(200);
        });
    })
});