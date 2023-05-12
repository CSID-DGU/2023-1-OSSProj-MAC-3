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

    private String s3Url;

    @Builder
    public FileVersionDto(String commitMessage, Boolean combination, String s3Url){
        this.commitMessage=commitMessage;
        this.combination=combination;
        this.s3Url=s3Url;
    }

    @Builder
    public FileVersionDto(String s3Url){
        this.s3Url=s3Url;
    }

    public FileVersion toEntity(){
        return FileVersion.builder()
                .commitMessage(commitMessage)
                .combination(combination)
                .build();
    }
}
