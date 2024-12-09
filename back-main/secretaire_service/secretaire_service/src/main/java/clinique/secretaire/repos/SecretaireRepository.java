package clinique.secretaire.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import clinique.secretaire.entities.Secretaire;

@RepositoryRestResource
public interface SecretaireRepository extends JpaRepository<Secretaire,Long>{

}
