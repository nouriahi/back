package clinique.medecin.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class KeycloakMedecinService {

    private static final String KEYCLOAK_SERVER_URL = "http://localhost:8086";
    private static final String REALM = "projet-realm";
    private static final String ADMIN_USERNAME = "nourhenjlassi";
    private static final String ADMIN_PASSWORD = "1234";
    private static final String CLIENT_ID = "projet-integration";

    private final RestTemplate restTemplate = new RestTemplate();

    public void createMedecin(String username, String email, String firstName, String lastName, String password) {
        // Obtenir un token d'accès admin
        String accessToken = getAdminAccessToken();

        // Construire la requête pour créer un utilisateur
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.set("Content-Type", "application/json");

        Map<String, Object> medecinPayload = Map.of(
            "username", username,
            "email", email,
            "firstName", firstName,
            "lastName", lastName,
            "enabled", true,
            "credentials", List.of(Map.of(
                "type", "password",
                "value", password,
                "temporary", false
            ))
        );

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(medecinPayload, headers);

        String url = KEYCLOAK_SERVER_URL + "/admin/realms/" + REALM + "/users"; //String url = KEYCLOAK_SERVER_URL + "/admin/realms/" + REALM + "/medecins";
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            System.out.println("medecin créé avec succès !");
        } else {
            System.err.println("Erreur lors de la création de medecin : " + response.getBody());
        }
    }

    private String getAdminAccessToken() {
        String url = KEYCLOAK_SERVER_URL + "/realms/master/protocol/openid-connect/token";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/x-www-form-urlencoded");

        String body = "client_id=" + CLIENT_ID +
                      "&username=" + ADMIN_USERNAME +
                      "&password=" + ADMIN_PASSWORD +
                      "&grant_type=password";

        HttpEntity<String> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, request, Map.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            return (String) response.getBody().get("access_token");
        } else {
            throw new RuntimeException("Impossible d'obtenir le token d'accès admin !");
        }
    }
}
