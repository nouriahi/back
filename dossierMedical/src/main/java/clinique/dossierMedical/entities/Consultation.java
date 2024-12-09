package clinique.dossierMedical.entities;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Consultation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate dateConsultation;
    private String diagnostic;
    private String traitement;

    @ManyToOne
    @JoinColumn(name = "dossier_medical_id", nullable = false)
    private dossierMedical dossierMedical; // Correction du type

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateConsultation() {
        return dateConsultation;
    }

    public void setDateConsultation(LocalDate dateConsultation) {
        this.dateConsultation = dateConsultation;
    }

    public String getDiagnostic() {
        return diagnostic;
    }

    public void setDiagnostic(String diagnostic) {
        this.diagnostic = diagnostic;
    }

    public String getTraitement() {
        return traitement;
    }

    public void setTraitement(String traitement) {
        this.traitement = traitement;
    }

    public dossierMedical getDossierMedical() {
        return dossierMedical;
    }

    public void setDossierMedical(dossierMedical dossierMedical) {
        this.dossierMedical = dossierMedical;
    }

    // Constructeurs
    public Consultation() {
        super();
    }

    public Consultation(Long id, LocalDate dateConsultation, String diagnostic, String traitement, dossierMedical dossierMedical) {
        super();
        this.id = id;
        this.dateConsultation = dateConsultation;
        this.diagnostic = diagnostic;
        this.traitement = traitement;
        this.dossierMedical = dossierMedical;
    }
}
