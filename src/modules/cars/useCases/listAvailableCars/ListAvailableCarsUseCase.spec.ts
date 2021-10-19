import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory
        );
    });

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Car description",
            daily_rate: 1900.0,
            license_plate: "DEF-4444",
            fine_amount: 120,
            brand: "Car_brand",
            category_id: "category_id",
        });
        const cars = await listAvailableCarsUseCase.execute({});
        expect(cars).toEqual(expect.arrayContaining([car]));
    });

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "Car description",
            daily_rate: 1900.0,
            license_plate: "DEF-4444",
            fine_amount: 120,
            brand: "Car_brand_test",
            category_id: "category_id",
        });
        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car_brand_test",
        });
        expect(cars).toEqual(expect.arrayContaining([car]));
    });

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Car description",
            daily_rate: 1900.0,
            license_plate: "DEF-6666",
            fine_amount: 120,
            brand: "Car_brand_test",
            category_id: "category_id",
        });
        const cars = await listAvailableCarsUseCase.execute({
            name: "Car3",
        });
        expect(cars).toEqual(expect.arrayContaining([car]));
    });

    it("should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Car description",
            daily_rate: 1900.0,
            license_plate: "DEF-6666",
            fine_amount: 120,
            brand: "Car_brand_test",
            category_id: "123456",
        });
        const cars = await listAvailableCarsUseCase.execute({
            category_id: "123456",
        });
        expect(cars).toEqual(expect.arrayContaining([car]));
    });
});
