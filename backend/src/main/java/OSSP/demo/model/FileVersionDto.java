package OSSP.demo.model;

import OSSP.demo.entity.FileVersion;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FileVersionDto {
    @NotNull
    private String commitMessage;
    private Boolean combination;

    @Builder
    public FileVersionDto(String commitMessage, Boolean combination){
        this.commitMessage=commitMessage;
        this.combination=combination;
    }

    public FileVersion toEntity(){
        return FileVersion.builder()
                .commitMessage(commitMessage)
                .combination(combination)
                .build();
    }
}
