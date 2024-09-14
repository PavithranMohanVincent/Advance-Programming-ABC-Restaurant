package abc.example.restaurant.Service;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import abc.example.restaurant.Model.Reservation;
import abc.example.restaurant.Repository.ReservationRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Optional<Reservation> getReservationById(ObjectId reservationId) {
        return reservationRepository.findById(reservationId);
    }

    public Reservation createReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public Reservation updateReservation(ObjectId reservationId, Reservation reservationDetails) {
        return reservationRepository.findById(reservationId).map(reservation -> {
            reservation.setName(reservationDetails.getName());
            reservation.setEmail(reservationDetails.getEmail());
            reservation.setPhone(reservationDetails.getPhone());
            reservation.setPersons(reservationDetails.getPersons());
            reservation.setDate(reservationDetails.getDate());
            reservation.setTime(reservationDetails.getTime());
            reservation.setBranch(reservationDetails.getBranch());
            return reservationRepository.save(reservation);
        }).orElseThrow(() -> new RuntimeException("Reservation not found"));
    }

    public void deleteReservation(ObjectId reservationId) {
        reservationRepository.deleteById(reservationId);
    }

    public List<Reservation> getReservationsByBranch(String branch) {
        return reservationRepository.findByBranch(branch);
    }
}
