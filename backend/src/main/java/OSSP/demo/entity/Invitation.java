package OSSP.demo.entity;

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
    private Team team;

    @JoinColumn(name = "leaderId")
    @ManyToOne(optional = false)
    private User leader;

    @JoinColumn(name = "fellowId")
    @ManyToOne(optional = false)
    private User fellow;

    @Column(nullable = true)
    private boolean isAccepted;

    public void setIsAccepted(boolean b) {
        this.isAccepted = b;
    }

    public Boolean getIsAccepted() {
        return this.isAccepted;
    }
}