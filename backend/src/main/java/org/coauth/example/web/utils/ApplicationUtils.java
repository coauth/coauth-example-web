package org.coauth.example.web.utils;

import net.datafaker.Faker;

public class ApplicationUtils {

  public static String generateRandomUserName() {
    Faker faker = new Faker();
    return faker.name().username();
  }
}
