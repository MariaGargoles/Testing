interface RoomProps {
    name: string;
    bookings: Booking[];
    rate: number;
    discount: number;
  }
  
  interface BookingProps {
    name: string;
    email: string;
    checkin: Date;
    checkout: Date;
    discount: number;
    room: Room;
  }
  
  class Room {
    private _name: string;
    private _bookings: Booking[];
    private _rate: number;
    private _discount: number;
  
    constructor({ name, bookings, rate, discount }: RoomProps) {
      this._name = name;
      this._bookings = bookings;
      this._rate = rate;
      this._discount = discount;
    }
  
    addBooking = (booking: Booking): void => {
      this._bookings.push(booking);
    };
  
    isOccupied = (date: Date): boolean => {
      return this._bookings.some(
        (booking) => booking.checkin <= date && date < booking.checkout
      );
    };
  
    occupancyPercentage = (startDate: Date, endDate: Date): number => {
      const start = startDate.getTime();
      const end = endDate.getTime();
      const millisecondsInDay = 86400000;
      let days = 0;
      let occupiedDays = 0;
  
      for (let i = start; i <= end; i += millisecondsInDay) {
        days++;
        const date = new Date(i);
        if (this.isOccupied(date)) occupiedDays++;
      }
  
      return (occupiedDays / days) * 100;
    };
  
    static totalOccupancyPercentage = (
      rooms: Room[],
      startDate: Date,
      endDate: Date
    ): number => {
      let percentage = 0;
      rooms.forEach((room) => {
        percentage += room.occupancyPercentage(startDate, endDate);
      });
  
      return percentage / rooms.length;
    };
  
    static availableRooms = (
      rooms: Room[],
      startDate: Date,
      endDate: Date
    ): Room[] => {
      return rooms.filter(
        (room) => room.occupancyPercentage(startDate, endDate) === 0
      );
    };
  }
  
  class Booking {
    private _name: string;
    private _email: string;
    private _checkin: Date;
    private _checkout: Date;
    private _discount: number;
    private _room: Room;
  
    constructor({ name, email, checkin, checkout, discount, room }: BookingProps) {
      this._name = name;
      this._email = email;
      this._checkin = checkin;
      this._checkout = checkout;
      this._discount = discount;
      this._room = room;
    }
  
    get checkin(): Date {
      return this._checkin;
    }
  
    get checkout(): Date {
      return this._checkout;
    }
  
    getFee = (): number => {
      const millisecondsInDay = 86400000;
      const start = this._checkin.getTime();
      const end = this._checkout.getTime();
      const nights = (end - start) / millisecondsInDay;
      const roomPrice =
        this._room._rate * nights -
        (this._room._rate * nights * this._room._discount) / 100;
      return roomPrice - roomPrice * (this._discount / 100);
    };
  }
  
  export { Room, Booking };
  