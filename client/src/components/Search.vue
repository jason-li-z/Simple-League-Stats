<template>
  <section class="search">
    <h1>Summoner Stats</h1>
    <form v-on:submit.prevent="onSubmit">
      <div class="user">
        <input
          type="text"
          name="text"
          v-model="username"
          id="username"
          placeholder="Enter Username"
        />
      </div>
      <div class="user">
        <input type="submit" value="Search!" class="btn" />
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: "Search",
  methods: {
    onSubmit() {
      this.username = this.username.trim();
      if (!this.username) {
        this.$toasted.show("Username field is empty", {
          duration: 3000,
          position: "bottom-center",
          theme: "bubble",
          type: "error"
        });
      } else if (
        this.username.length < 3 ||
        this.username.length > 16 ||
        this.username.match("^[[!@#$%^&*()]]")
      ) {
        this.$toasted.show("Please enter a valid username", {
          duration: 3000,
          position: "bottom-center",
          theme: "bubble",
          type: "error"
        });
      } else {
        this.$router.push(`/summoner/${this.username}`);
      }
    }
  }
};
</script>

<style scoped>
h1 {
  color: #ef8354;
  font-size: 32px;
}

.user input {
  position: relative;
  max-width: 300px;
  margin: auto;
}

.user #username {
  border: 0;
  border-bottom: 2px solid #ef8354;
  width: 100%;
  font-size: 30px;
  line-height: 35px;
  height: 50px;
  text-align: center;
  padding: 10px;
  background: transparent;
  outline: none;
  color: #ef8354;
}

.user .btn {
  box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.25);
  padding: 15px 5px;
  width: 50%;
  display: inline-block;
  border-radius: 30px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  top: 50px;
  outline: none;
  background-color: #ef8354;
}
</style>