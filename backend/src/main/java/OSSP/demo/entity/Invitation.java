package OSSP.demo.entity;

import OSSP.demo.service.security.AesEncryptor;
import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class Invitation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "teamId")
    @ManyToOne(optional = false)
    @Convert(converter = AesEncryptor.class)
    private Team team;

    @JoinColumn(name = "leaderId")
    @ManyToOne(optional = false)
    @Convert(converter = AesEncryptor.class)
    private User leader;

    @JoinColumn(name = "fellowId")
    @ManyToOne(optional = false)
    @Convert(converter = AesEncryptor.class)
    private User fellow;

    @Column(nullable = true)
    private String isAccepted;

    public void setIsAccepted(String status) {
        this.isAccepted = status;
    }
}