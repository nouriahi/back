package clinique.medecin.service;

import clinique.medecin.entities.Medecin;
import clinique.medecin.entities.MedecinCreationDto;
import clinique.medecin.entities.MedecinSecretaire;
import clinique.medecin.repos.MedecinRepository;
import clinique.medecin.repos.MedecinSecretaireRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class MedecinService {

    @Autowired
    private MedecinRepository medecinRepository;

    @Autowired
    private SecretaireClient secretaireClient;

    @Autowired
    private MedecinSecretaireRepository medecinSecretaireRepository;
    @Transactional
    public Medecin creerMedecinAvecAffectation(MedecinCreationDto medecinDto) {
        if (secretaireClient.getSecretaireById(medecinDto.getSecretaireId()) == null) {
            throw new RuntimeException("La secrétaire n'existe pas.");
        }

        Medecin medecin = new Medecin();
        medecin.setNom(medecinDto.getNom());
        medecin.setPrenom(medecinDto.getPrenom());
        medecin.setTel(medecinDto.getTel());
        medecin.setEmail(medecinDto.getEmail());
        medecin.setMotDePasse(medecinDto.getMotDePasse());
        medecin.setSpecialite(medecinDto.getSpecialite());
        medecin.setDescription(medecinDto.getDescription());
        medecin.setLangues(medecinDto.getLangues());
        Medecin savedMedecin = medecinRepository.save(medecin);

        affecterMedecinASecitaire(savedMedecin.getId(), medecinDto.getSecretaireId());
        return savedMedecin;
    }

    public Medecin obtenirMedecinParId(Long id) {
        return medecinRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Médecin non trouvé"));
    }

    public List<Medecin> obtenirTousLesMedecins() {
        return medecinRepository.findAll();
    }

    @Transactional
    public Medecin mettreAJourMedecin(Long id, MedecinCreationDto medecinUpdateDto) {
        Medecin medecin = obtenirMedecinParId(id);
        
        // Mettre à jour les détails du médecin
        medecin.setNom(medecinUpdateDto.getNom());
        medecin.setPrenom(medecinUpdateDto.getPrenom());
        medecin.setTel(medecinUpdateDto.getTel());
        medecin.setEmail(medecinUpdateDto.getEmail());
        medecin.setSpecialite(medecinUpdateDto.getSpecialite());
        medecin.setDescription(medecinUpdateDto.getDescription());
        medecin.setLangues(medecinUpdateDto.getLangues());
        
        // Vérifier si la secrétaire existe
        if (secretaireClient.getSecretaireById(medecinUpdateDto.getSecretaireId()) == null) {
            throw new RuntimeException("La secrétaire n'existe pas.");
        }
        
        // Supprimer l'ancienne affectation si elle existe
        medecinSecretaireRepository.deleteByMedecinId(id);
        
        // Affecter le médecin à la nouvelle secrétaire
        affecterMedecinASecitaire(medecin.getId(), medecinUpdateDto.getSecretaireId());
        
        return medecinRepository.save(medecin);
    }


    @Transactional
    public void supprimerMedecin(Long id) {
        if (!medecinRepository.existsById(id)) {
            throw new RuntimeException("Médecin non trouvé");
        }

        // Supprimer les affectations associées
        medecinSecretaireRepository.deleteByMedecinId(id);
        
        // Supprimer le médecin
        medecinRepository.deleteById(id);
    }

    @Transactional
	public void affecterMedecinASecitaire(Long medecinId, Long secretaireId) {
        MedecinSecretaire affectation = new MedecinSecretaire();
        affectation.setMedecinId(medecinId);
        affectation.setSecretaireId(secretaireId);
        medecinSecretaireRepository.save(affectation);
    }
    @Transactional
    public Medecin creerMedecinSansAffectation(Medecin medecinDto) {
        // Créer un nouvel objet Medecin à partir des données du DTO
        Medecin medecin = new Medecin();
        medecin.setNom(medecinDto.getNom());
        medecin.setPrenom(medecinDto.getPrenom());
        medecin.setTel(medecinDto.getTel());
        medecin.setEmail(medecinDto.getEmail());
        medecin.setMotDePasse(medecinDto.getMotDePasse());
        medecin.setSpecialite(medecinDto.getSpecialite());
        medecin.setDescription(medecinDto.getDescription());
        medecin.setLangues(medecinDto.getLangues());

        // Sauvegarder le médecin dans le repository
        return medecinRepository.save(medecin);
    }

}