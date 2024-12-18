package clinique.rendezVous.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import clinique.rendezVous.entities.RendezVous;

public interface RendezVousRepos  extends JpaRepository<RendezVous, Long> {
}

