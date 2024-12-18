package clinique.rendezVous.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import clinique.rendezVous.entities.Medecin;
import clinique.rendezVous.entities.RendezVous;
import clinique.rendezVous.services.RendezVousService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/rendezvous")
public class RendezVousController {

    private final RendezVousService rendezVousService;

    public RendezVousController(RendezVousService rendezVousService) {
        this.rendezVousService = rendezVousService;
    }

    @GetMapping
    public ResponseEntity<List<RendezVous>> getAllRendezVous() {
        return ResponseEntity.ok(rendezVousService.getAllRendezVous());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RendezVous> getRendezVousById(@PathVariable Long id) {
        return rendezVousService.getRendezVousById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @PostMapping
    public ResponseEntity<RendezVous> createRendezVous(@RequestBody RendezVous rendezVous) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(rendezVousService.createRendezVous(rendezVous));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<RendezVous> updateRendezVous(@PathVariable Long id, @RequestBody RendezVous updatedRendezVous) {
        try {
            return ResponseEntity.ok(rendezVousService.updateRendezVous(id, updatedRendezVous));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRendezVous(@PathVariable Long id) {
        try {
            rendezVousService.deleteRendezVous(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/medecins")
    public ResponseEntity<List<Medecin>> getAllMedecins() {
        try {
            return ResponseEntity.ok(rendezVousService.getAllMedecins());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
