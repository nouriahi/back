package clinique.dossierMedical.controllers;


import clinique.dossierMedical.entities.Consultation;
import clinique.dossierMedical.services.ConsultationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/consultations")
public class ConsultationController {

    @Autowired
    private ConsultationService consultationService;

    // Endpoint pour ajouter une consultation
    @PostMapping("/add/{dossierId}")
    public Consultation ajouterConsultation(@PathVariable Long dossierId, @RequestBody Consultation consultation) {
        return consultationService.ajouterConsultation(dossierId, consultation);
    }

    // Endpoint pour obtenir toutes les consultations d'un dossier médical
    @GetMapping("/dossier/{dossierId}")
    public List<Consultation> obtenirConsultationsParDossier(@PathVariable Long dossierId) {
        return consultationService.obtenirConsultationsParDossier(dossierId);
    }

    // Endpoint pour récupérer une consultation par son ID
    @GetMapping("/{id}")
    public Consultation obtenirConsultationParId(@PathVariable Long id) {
        return consultationService.obtenirConsultationParId(id);
    }

    // Endpoint pour supprimer une consultation
    @DeleteMapping("/{id}")
    public void supprimerConsultation(@PathVariable Long id) {
        consultationService.supprimerConsultation(id);
    }

    // Endpoint pour mettre à jour une consultation
    @PutMapping("/{id}")
    public Consultation mettreAJourConsultation(@PathVariable Long id, @RequestBody Consultation consultation) {
        return consultationService.mettreAJourConsultation(id, consultation);
    }

    // Endpoint pour lister toutes les consultations
    @GetMapping
    public List<Consultation> listerConsultations() {
        return consultationService.listerConsultations();
    }
}
