FROM eclipse-temurin:25-jdk

WORKDIR /app

COPY gradlew .
COPY gradle gradle
COPY build.gradle.kts .
COPY settings.gradle.kts .

RUN ./gradlew dependencies --no-daemon

COPY src src

EXPOSE 8080

CMD ["./gradlew", "bootRun", "--no-daemon"]