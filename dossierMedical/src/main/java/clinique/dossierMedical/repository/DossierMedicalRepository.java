package clinique.dossierMedical.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import clinique.dossierMedical.entities.dossierMedical;

@Repository
public interface DossierMedicalRepository extends JpaRepository<dossierMedical, Long> {
 
}

