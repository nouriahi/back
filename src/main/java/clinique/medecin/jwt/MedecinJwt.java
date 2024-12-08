package clinique.medecin.jwt;


import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import lombok.Data;
import java.util.Collection;

@Data
public class MedecinJwt extends JwtAuthenticationToken {

    private String firstname;

    private String lastname;

    public MedecinJwt(Jwt jwt, Collection<? extends GrantedAuthority> authorities) {
        super(jwt, authorities);
    }

   
}