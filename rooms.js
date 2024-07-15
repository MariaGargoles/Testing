"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = exports.Room = void 0;
var Room = /** @class */ (function () {
    function Room(_a) {
        var name = _a.name, bookings = _a.bookings, rate = _a.rate, discount = _a.discount;
        var _this = this;
        this.addBooking = function (booking) {
            _this._bookings.push(booking);
        };
        this.isOccupied = function (date) {
            return _this._bookings.some(function (booking) { return booking.checkin <= date && date < booking.checkout; });
        };
        this.occupancyPercentage = function (startDate, endDate) {
            var start = startDate.getTime();
            var end = endDate.getTime();
            var millisecondsInDay = 86400000;
            var days = 0;
            var occupiedDays = 0;
            for (var i = start; i <= end; i += millisecondsInDay) {
                days++;
                var date = new Date(i);
                if (_this.isOccupied(date))
                    occupiedDays++;
            }
            return (occupiedDays / days) * 100;
        };
        this._name = name;
        this._bookings = bookings;
        this._rate = rate;
        this._discount = discount;
    }
    Object.defineProperty(Room.prototype, "rate", {
        get: function () {
            return this._rate;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "discount", {
        get: function () {
            return this._discount;
        },
        enumerable: false,
        configurable: true
    });
    Room.totalOccupancyPercentage = function (rooms, startDate, endDate) {
        var percentage = 0;
        rooms.forEach(function (room) {
            percentage += room.occupancyPercentage(startDate, endDate);
        });
        return percentage / rooms.length;
    };
    Room.availableRooms = function (rooms, startDate, endDate) {
        return rooms.filter(function (room) { return room.occupancyPercentage(startDate, endDate) === 0; });
    };
    return Room;
}());
exports.Room = Room;
var Booking = /** @class */ (function () {
    function Booking(_a) {
        var name = _a.name, email = _a.email, checkin = _a.checkin, checkout = _a.checkout, discount = _a.discount, room = _a.room;
        var _this = this;
        this.getFee = function () {
            var millisecondsInDay = 86400000; // Milisegundos en un día
            var start = _this._checkin.getTime();
            var end = _this._checkout.getTime();
            var nights = (end - start) / millisecondsInDay; // Número de noches de la reserva
            // Tarifa base total
            var roomPrice = _this._room.rate * nights;
            // Descuento de habitación
            var roomDiscountAmount = (roomPrice * _this._room.discount) / 100;
            var priceAfterRoomDiscount = roomPrice - roomDiscountAmount;
            // Descuento adicional del cliente
            var finalFee = priceAfterRoomDiscount - (priceAfterRoomDiscount * _this._discount) / 100;
            return finalFee;
        };
        this._name = name;
        this._email = email;
        this._checkin = checkin;
        this._checkout = checkout;
        this._discount = discount;
        this._room = room;
    }
    Object.defineProperty(Booking.prototype, "checkin", {
        get: function () {
            return this._checkin;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Booking.prototype, "checkout", {
        get: function () {
            return this._checkout;
        },
        enumerable: false,
        configurable: true
    });
    return Booking;
}());
exports.Booking = Booking;
