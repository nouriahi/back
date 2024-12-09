package clinique.dossierMedical.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import clinique.dossierMedical.entities.Consultation;
import clinique.dossierMedical.entities.dossierMedical;
import clinique.dossierMedical.repository.ConsultationRepository;
import clinique.dossierMedical.repository.DossierMedicalRepository;

@Service
public class ConsultationService {

    @Autowired
    private ConsultationRepository consultationRepository;

    @Autowired
    private DossierMedicalRepository dossierMedicalRepository;

    // Méthode pour récupérer une consultation par son ID
    public Consultation obtenirConsultationParId(Long id) {
        return consultationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consultation non trouvée"));
    }

    // Méthode pour ajouter une consultation à un dossier médical existant
    public Consultation ajouterConsultation(Long dossierId, Consultation consultation) {
        dossierMedical dossierMedical = dossierMedicalRepository.findById(dossierId)
                .orElseThrow(() -> new RuntimeException("Dossier médical non trouvé"));
        
        consultation.setDossierMedical(dossierMedical);
        return consultationRepository.save(consultation);
    }

    // Méthode pour obtenir toutes les consultations d'un dossier médical spécifique
    public List<Consultation> obtenirConsultationsParDossier(Long dossierId) {
        return consultationRepository.findByDossierMedicalId(dossierId);
    }

    // Méthode pour supprimer une consultation
    public void supprimerConsultation(Long id) {
        if (!consultationRepository.existsById(id)) {
            throw new RuntimeException("Consultation non trouvée");
        }
        consultationRepository.deleteById(id);
    }

    // Méthode pour mettre à jour une consultation existante
    public Consultation mettreAJourConsultation(Long id, Consultation consultation) {
        Consultation existingConsultation = obtenirConsultationParId(id);
        existingConsultation.setDateConsultation(consultation.getDateConsultation());
        existingConsultation.setDiagnostic(consultation.getDiagnostic());
        existingConsultation.setTraitement(consultation.getTraitement());
        return consultationRepository.save(existingConsultation);
    }

    // Méthode pour lister toutes les consultations
    public List<Consultation> listerConsultations() {
        return consultationRepository.findAll();
    }
}
