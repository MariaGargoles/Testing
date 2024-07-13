interface BookingProps {
    name: string;
    email: string;
    checkin: Date;
    checkout: Date;
    discount: number;
    room: Room;
}

interface RoomProps {
    name: string;
    bookings: Booking[];
    rate: number;
    discount: number; 
}

class Room { 
    private _name: string;
    private _booking: Booking[];
    private _rate: number;
    private _discount: number;

    constructor({name, booking, rate, discount }: RoomProps) {

    }
    addBooking = (bookking: Booking): void => {
        this._bookings.push(booking);
    }

   
}