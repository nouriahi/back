package clinique.medecin.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import clinique.medecin.entities.Medecin;
@RepositoryRestResource
public interface MedecinRepository extends JpaRepository<Medecin,Long>{

}
