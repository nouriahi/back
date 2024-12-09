package clinique.dossierMedical.services;

import clinique.dossierMedical.entities.Consultation;
import clinique.dossierMedical.entities.dossierMedical;
import clinique.dossierMedical.repository.DossierMedicalRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Service
public class dossierMedicalService {

    @Autowired
    private DossierMedicalRepository dossierMedicalRepository;

    @Autowired
    private ConsultationService consultationService;

    private final String PATIENT_SERVICE_URL = "http://localhost:3000/patients/";

    // Vérifie si un patient existe dans le service Node.js
    public boolean verifierPatientExiste(Long patientId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = PATIENT_SERVICE_URL + patientId;

        try {
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            return response.getStatusCode().is2xxSuccessful();
        } catch (Exception e) {
            return false; // Retourne faux si le patient n'existe pas ou en cas d'erreur
        }
    }

    // Création d'un dossier médical
    public dossierMedical creerDossier(dossierMedical dossierMedical) {
        if (!verifierPatientExiste(dossierMedical.getPatientId())) {
            throw new RuntimeException("Le patient avec l'ID " + dossierMedical.getPatientId() + " n'existe pas.");
        }
        return dossierMedicalRepository.save(dossierMedical);
    }

    // Récupérer un dossier médical par son ID
    public dossierMedical obtenirDossierParId(Long id) {
        return dossierMedicalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dossier médical non trouvé"));
    }

    // Lister tous les dossiers médicaux
    public List<dossierMedical> listerDossiers() {
        return dossierMedicalRepository.findAll();
    }

    // Mise à jour d'un dossier médical
    public dossierMedical mettreAJourDossier(Long id, dossierMedical dossierMedical) {
        dossierMedical existingDossier = obtenirDossierParId(id);

        if (!verifierPatientExiste(dossierMedical.getPatientId())) {
            throw new RuntimeException("Le patient avec l'ID " + dossierMedical.getPatientId() + " n'existe pas.");
        }

        existingDossier.setPatientId(dossierMedical.getPatientId());
        existingDossier.setNomPatient(dossierMedical.getNomPatient());
        existingDossier.setPrenomPatient(dossierMedical.getPrenomPatient());
        existingDossier.setDateNaissance(dossierMedical.getDateNaissance());
        existingDossier.setAdresse(dossierMedical.getAdresse());
        existingDossier.setTelephone(dossierMedical.getTelephone());

        return dossierMedicalRepository.save(existingDossier);
    }

    // Suppression d'un dossier médical
    public void supprimerDossier(Long id) {
        if (!dossierMedicalRepository.existsById(id)) {
            throw new RuntimeException("Dossier médical non trouvé");
        }
        dossierMedicalRepository.deleteById(id);
    }

    // Ajouter une consultation
    public Consultation ajouterConsultation(Long dossierId, Consultation consultation) {
        return consultationService.ajouterConsultation(dossierId, consultation);
    }

    // Obtenir les consultations d'un dossier médical
    public List<Consultation> obtenirConsultationsParDossier(Long dossierId) {
        return consultationService.obtenirConsultationsParDossier(dossierId);
    }

    // Mettre à jour une consultation spécifique
    public Consultation mettreAJourConsultation(Long id, Consultation consultation) {
        return consultationService.mettreAJourConsultation(id, consultation);
    }

    // Supprimer une consultation
    public void supprimerConsultation(Long id) {
        consultationService.supprimerConsultation(id);
    }
}
