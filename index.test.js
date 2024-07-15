const { Room, Booking } = require("./rooms");

// Crear instancias de Room con tarifas ajustadas
const habitacion1 = new Room({
  name: "Suite A-107",
  bookings: [],
  rate: 68000, // Tarifa base para cumplir con el primer test
  discount: 50, // Descuento de habitación
});

const habitacion2 = new Room({
  name: "Doble B-202",
  bookings: [],
  rate: 20000, // Tarifa base para pruebas con otra habitación
  discount: 20,
});

// Crear instancias de Booking y agregar a las habitaciones
const reserva1Habitacion1 = new Booking({
  name: "Juan Pérez",
  email: "juan.perez@example.com",
  checkin: new Date("2024-06-08"),
  checkout: new Date("2024-06-09"),
  discount: 10,
  room: habitacion1,
});
habitacion1.addBooking(reserva1Habitacion1);

const reserva2Habitacion1 = new Booking({
  name: "Ana Gómez",
  email: "ana.gomez@example.com",
  checkin: new Date("2024-06-05"),
  checkout: new Date("2024-06-06"),
  discount: 0,
  room: habitacion1,
});
habitacion1.addBooking(reserva2Habitacion1);

const reserva3Habitacion1 = new Booking({
  name: "Pedro Fernández",
  email: "pedro.fernandez@example.com",
  checkin: new Date("2024-06-10"),
  checkout: new Date("2024-06-12"),
  discount: 20,
  room: habitacion1,
});
habitacion1.addBooking(reserva3Habitacion1);

const reserva1Habitacion2 = new Booking({
  name: "Laura Martínez",
  email: "laura.martinez@example.com",
  checkin: new Date("2024-06-07"),
  checkout: new Date("2024-06-10"),
  discount: 10,
  room: habitacion2,
});
habitacion2.addBooking(reserva1Habitacion2);

const reserva2Habitacion2 = new Booking({
  name: "Ana Gómez",
  email: "ana.gomez@example.com",
  checkin: new Date("2024-06-05"),
  checkout: new Date("2024-06-06"),
  discount: 0,
  room: habitacion2,
});
habitacion2.addBooking(reserva2Habitacion2);

const reserva3Habitacion2 = new Booking({
  name: "Pedro Fernández",
  email: "pedro.fernandez@example.com",
  checkin: new Date("2024-06-10"),
  checkout: new Date("2024-06-13"),
  discount: 20,
  room: habitacion2,
});
habitacion2.addBooking(reserva3Habitacion2);

// Tests

test("debe verificar que la habitación 1 está ocupada en la fecha 2024-06-08", () => {
  expect(habitacion1.isOccupied(new Date("2024-06-08"))).toBe(true);
});

test("debe verificar que la habitación 1 no está ocupada en la fecha 2024-06-12", () => {
  expect(habitacion1.isOccupied(new Date("2024-06-12"))).toBe(false);
});

test("debe verificar que la habitación 1 no está ocupada en la fecha 2024-06-09", () => {
  expect(habitacion1.isOccupied(new Date("2024-06-09"))).toBe(false);
});

test("debe verificar que la habitación 1 no está ocupada en la fecha 2024-06-07", () => {
  expect(habitacion1.isOccupied(new Date("2024-06-07"))).toBe(false);
});

test("debe verificar que la habitación 1 no está ocupada en la fecha 2024-06-12", () => {
  expect(habitacion1.isOccupied(new Date("2024-06-12"))).toBe(false);
});

test("debe devolver que la habitación 1 tiene un 50% de ocupación entre el 2024-06-08 y el 2024-06-09", () => {
  expect(
    habitacion1.occupancyPercentage(
      new Date("2024-06-08"),
      new Date("2024-06-09")
    )
  ).toBe(50);
});

test("debe devolver que la habitación 1 tiene un 0% de ocupación entre el 2024-06-13 y el 2024-06-20", () => {
  expect(
    habitacion1.occupancyPercentage(
      new Date("2024-06-13"),
      new Date("2024-06-20")
    )
  ).toBe(0);
});

test("debe devolver que la habitación 1 tiene un 100% de ocupación entre el 2024-06-10 y el 2024-06-11", () => {
  expect(
    habitacion1.occupancyPercentage(
      new Date("2024-06-10"),
      new Date("2024-06-11")
    )
  ).toBe(100);
});

test("debe devolver que con ambas habitaciones la ocupación es del 0% entre el 2024-06-13 y el 2024-06-20", () => {
  const habitaciones = [habitacion1, habitacion2];
  expect(
    Room.totalOccupancyPercentage(
      habitaciones,
      new Date("2024-06-13"),
      new Date("2024-06-20")
    )
  ).toBe(0);
});

test("debe devolver que con ambas habitaciones la ocupación es del 100% entre el 2024-06-10 y el 2024-06-11", () => {
  const habitaciones = [habitacion1, habitacion2];
  expect(
    Room.totalOccupancyPercentage(
      habitaciones,
      new Date("2024-06-10"),
      new Date("2024-06-11")
    )
  ).toBe(100);
});

test("debe devolver que con ambas habitaciones la ocupación es del 50% entre el 2024-06-05 y el 2024-06-06", () => {
  const habitaciones = [habitacion1, habitacion2];
  expect(
    Room.totalOccupancyPercentage(
      habitaciones,
      new Date("2024-06-05"),
      new Date("2024-06-06")
    )
  ).toBe(50);
});

test("debe devolver ambas habitaciones entre el 2024-06-13 y el 2024-06-20", () => {
  const habitaciones = [habitacion1, habitacion2];
  expect(
    Room.availableRooms(
      habitaciones,
      new Date("2024-06-13"),
      new Date("2024-06-20")
    )
  ).toEqual([habitacion1, habitacion2]);
});

test("debe devolver un array vacío entre el 2024-06-10 y el 2024-06-11", () => {
  const habitaciones = [habitacion1, habitacion2];
  expect(
    Room.availableRooms(
      habitaciones,
      new Date("2024-06-10"),
      new Date("2024-06-11")
    )
  ).toEqual([]);
});

test("debe devolver un array con solo la habitación 1 entre el 2024-06-12 y el 2024-06-14", () => {
  const habitaciones = [habitacion1, habitacion2];
  expect(
    Room.availableRooms(
      habitaciones,
      new Date("2024-06-12"),
      new Date("2024-06-14")
    )
  ).toEqual([habitacion1]);
});

test("debe devolver 30600 como tarifa total para la reserva 1 de la habitación 1", () => {
  expect(reserva1Habitacion1.getFee()).toBe(30600);
});

test("debe devolver 34000 como tarifa total para la reserva 2 de la habitación 1", () => {
  expect(reserva2Habitacion1.getFee()).toBe(34000);
});

test("debe devolver 54400 como tarifa total para la reserva 3 de la habitación 1", () => {
  expect(reserva3Habitacion1.getFee()).toBe(54400);
});
