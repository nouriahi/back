package clinique.medecin.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import clinique.medecin.entities.MedecinSecretaire;
@RepositoryRestResource
public interface MedecinSecretaireRepository extends JpaRepository<MedecinSecretaire,Long>{

	


}
