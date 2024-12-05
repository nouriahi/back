package clinique.secretaire.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import clinique.secretaire.entities.Secretaire;
import clinique.secretaire.repos.SecretaireRepository;

@Service
public class SecretaireService {

    @Autowired
    private SecretaireRepository secretaireRepository;

    public Secretaire ajouterSecretaire(Secretaire secretaire) {
        return secretaireRepository.save(secretaire);
    }
    public List<Secretaire> getAllSecretaires() {
        return secretaireRepository.findAll();
    }

    public Optional<Secretaire> getSecretaireById(Long id) {
        return secretaireRepository.findById(id);
    }
    public Secretaire updateSecretaire(Long id, Secretaire secretaireDetails) {
        Secretaire secretaire = secretaireRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Secretaire non trouvée avec l'id : " + id));

        secretaire.setNom(secretaireDetails.getNom());
        secretaire.setPrenom(secretaireDetails.getPrenom());
        secretaire.setTel(secretaireDetails.getTel());
        secretaire.setEmail(secretaireDetails.getEmail());
        //secretaire.setMotDePasse(secretaireDetails.getMotDePasse());
        secretaire.setCompetences(secretaireDetails.getCompetences());

        return secretaireRepository.save(secretaire);
    }

    public void deleteSecretaire(Long id) {
        if (secretaireRepository.existsById(id)) {
            secretaireRepository.deleteById(id);  // Supprimer le secrétaire par ID
        } else {
            throw new RuntimeException("Secretaire not found for id: " + id);
        }
    }
}

