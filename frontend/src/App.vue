<template>
  <div class="app">
    <header class="header">
      <h1>Zero Hunger Recipes</h1>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/recipes">Recipes</RouterLink>
        <RouterLink to="/ingredients">Ingredients</RouterLink>
        <RouterLink to="/dashboard">Dashboard</RouterLink>
      </nav>
    </header>

    <main class="container">
      <RouterView />
    </main>
  </div>
</template>