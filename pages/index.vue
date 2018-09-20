<template>
  <v-container>
    <v-layout column>
      <v-expansion-panel>
        <v-expansion-panel-content
          v-for="(user, key) in users"
          :key="user.id"
        >
          <div slot="header" class="d-flex">
            <span>{{ user.id }}</span>
            <span>{{ user.name }}</span>
            <span>{{ user.company.name }}</span>
          </div>
          <v-card
            class="ma-4">
            <v-form
              v-model="valid"
            >
              <v-text-field
                v-model="user.id"
                :readonly="true"
                label="ID"
              />
              <v-text-field
                v-model="user.name"
                :rules="nameRules"
                :counter="30"
                label="Name"
                required
              />
              <v-text-field
                v-model="user.email"
                :rules="emailRules"
                label="E-mail"
                required
              />
              <v-text-field
                v-model="user.company.name"
                :rules="companyRules"
                label="Company Name"
                required
              />
              <transition
                mode="out-in"
                name="fade"
              >
                <v-btn
                :disabled="!valid"
                @click="submit(key)"
                v-if="updatedUser !== user.id"
                >
                  submit
                </v-btn>
                <v-alert
                  :value="true"
                  type="success"
                  color="green"
                  v-else
                  transition="fade-transition"
                  :hide-on-leave="true"
                >
                  Your information has been successfully submitted. You can verify this by checking console for a response from Apollo Launchpad after successfully resolving PATCH request to API.
                </v-alert>
              </transition>
            </v-form>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-layout>
  </v-container>
</template>

<script>
import gql from "graphql-tag";
import users from "../apollo/users.gql";
import updateUser from "../apollo/updateUser.gql";

export default {
  apollo: {
    users: {
      prefetch: true,
      query: users
    }
  },

  data() {
    return {
      valid: false,
      updatedUser: 0,
      name: "",
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 30 || "Name must be less than 30 characters"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      companyRules: [
        v => !!v || "Name is required",
        v => v.length <= 30 || "Name must be less than 30 characters"
      ]
    };
  },

  methods: {
    submit(id) {
      this.$apollo
        .mutate({
          mutation: updateUser,
          variables: {
            id: id + 1,
            user: {
              name: this.users[id].name,
              email: this.users[id].email,
              company: {
                name: this.users[id].company.name
              }
            }
          }
        })
        .then(data => {
          console.info(data);
          let timer;
          window.clearTimeout(timer);
          this.updatedUser = data.data.updateUser.id;
          timer = window.setTimeout(() => {
            this.updatedUser = 0;
          }, 12000);
        });
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  opacity: 1;
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>




