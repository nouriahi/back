package clinique.rendezVous.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class RendezVous {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long patientId;

    @Column(nullable = false)
    private Long medecinId;

    @Column(nullable = false)
    private LocalDateTime rendezVousDate;

    @Column(nullable = false, columnDefinition = "VARCHAR(20) DEFAULT 'pending'")
    private String status = "pending";

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    // Nouveaux attributs
    @Column(nullable = false)
    private String nom; // Nom du patient

    @Column(nullable = false)
    private String prenom; // Prénom du patient

    @Column(nullable = false)
    private String email; // Email du patient

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }

    public Long getMedecinId() { return medecinId; }
    public void setMedecinId(Long medecinId) { this.medecinId = medecinId; }

    public LocalDateTime getRendezVousDate() { return rendezVousDate; }
    public void setRendezVousDate(LocalDateTime rendezVousDate) { this.rendezVousDate = rendezVousDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    // Constructeurs
    public RendezVous(Long id, Long patientId, Long medecinId, LocalDateTime rendezVousDate, String status,
                      LocalDateTime createdAt, LocalDateTime updatedAt, String nom, String prenom, String email) {
        super();
        this.id = id;
        this.patientId = patientId;
        this.medecinId = medecinId;
        this.rendezVousDate = rendezVousDate;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
    }

    public RendezVous() {
        super();
    }
}
