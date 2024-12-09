package clinique.dossierMedical.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import clinique.dossierMedical.entities.Consultation;

@Repository
public interface ConsultationRepository extends JpaRepository<Consultation, Long> {
    List<Consultation> findByDossierMedicalId(Long dossierMedicalId);
}
