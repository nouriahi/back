package clinique.medecin.service;

import clinique.medecin.entities.Medecin;
import clinique.medecin.entities.MedecinCreationDto;
import clinique.medecin.entities.MedecinSecretaire;
import clinique.medecin.repos.MedecinRepository;
import clinique.medecin.repos.MedecinSecretaireRepository;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MedecinService {

    @Autowired
    private MedecinRepository medecinRepository;

    @Autowired
    private MedecinSecretaireRepository medecinSecretaireRepository;

    @Autowired
    private SecretaireClient secretaireClient;

    @Transactional
    public Medecin creerMedecinAvecAffectation(MedecinCreationDto medecinDto) {
        // Vérifier si la secrétaire existe
        if (secretaireClient.getSecretaireById(medecinDto.getSecretaireId()) == null) {
            throw new RuntimeException("La secrétaire n'existe pas.");
        }

        // Créer le médecin
        Medecin medecin = new Medecin();
        medecin.setNom(medecinDto.getNom());
        medecin.setPrenom(medecinDto.getPrenom());
        medecin.setTel(medecinDto.getTel());
        medecin.setEmail(medecinDto.getEmail());
        medecin.setMotDePasse(medecinDto.getMotDePasse());
        medecin.setSpecialite(medecinDto.getSpecialite());
        medecin.setDescription(medecinDto.getDescription());
        medecin.setLangues(medecinDto.getLangues());
        
        // Enregistrer le médecin
        Medecin savedMedecin = medecinRepository.save(medecin);

        // Affecter le médecin à la secrétaire
        affecterMedecinASecitaire(savedMedecin.getId(), medecinDto.getSecretaireId());

        return savedMedecin;
    }

    private void affecterMedecinASecitaire(Long medecinId, Long secretaireId) {
        // Enregistrer l'affectation
        MedecinSecretaire affectation = new MedecinSecretaire();
        affectation.setMedecinId(medecinId);
        affectation.setSecretaireId(secretaireId);
        medecinSecretaireRepository.save(affectation);
    }
}
