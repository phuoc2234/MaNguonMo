let bookings = [];
let idCounter = 1;

exports.getAllBookings = (req, res) => {
    const message = req.query.success ? { type: 'success', text: 'Đặt lịch thành công!' } : null;
    res.render('bookingList', { bookings, message });
};

exports.getNewBookingForm = (req, res) => {
    res.render('bookingForm', { booking: null, message: null });
};

exports.createBooking = (req, res) => {
    const { customerName, date, time } = req.body;
    
    // Kiểm tra ngày tháng quá khứ
    const selectedDate = new Date(date + 'T' + time);
    const currentDate = new Date();
    
    if (selectedDate < currentDate) {
        return res.render('bookingForm', { 
            booking: { customerName, date, time }, 
            message: { type: 'error', text: 'Không thể đặt lịch trong quá khứ!' }
        });
    }

    bookings.push({ id: idCounter++, customerName, date, time, status: 'Pending' });
    res.redirect('/bookings?success=true');
};

exports.getEditBookingForm = (req, res) => {
    const booking = bookings.find(b => b.id == req.params.id);
    res.render('bookingForm', { booking, message: null });
};

exports.updateBooking = (req, res) => {
    const { customerName, date, time } = req.body;
    const booking = bookings.find(b => b.id == req.params.id);
    
    if (booking) {
        // Kiểm tra ngày tháng quá khứ
        const selectedDate = new Date(date + 'T' + time);
        const currentDate = new Date();
        
        if (selectedDate < currentDate) {
            return res.render('bookingForm', { 
                booking: { ...booking, customerName, date, time }, 
                message: { type: 'error', text: 'Không thể đặt lịch trong quá khứ!' }
            });
        }

        booking.customerName = customerName;
        booking.date = date;
        booking.time = time;
        res.redirect('/bookings?success=true');
    } else {
        res.redirect('/bookings');
    }
};

exports.cancelBooking = (req, res) => {
    const booking = bookings.find(b => b.id == req.params.id);
    if (booking) {
        booking.status = 'Cancelled';
    }
    res.redirect('/bookings');
};
