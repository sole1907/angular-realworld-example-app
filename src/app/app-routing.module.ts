import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const routes: Routes = [
  {
    path: "settings",
    loadChildren: "./settings/settings.module#SettingsModule",
  },
  {
    path: "profile",
    loadChildren: "./profile/profile.module#ProfileModule",
  },
  {
    path: "editor",
    loadChildren: "./editor/editor.module#EditorModule",
  },
  {
    path: "article",
    loadChildren: "./article/article.module#ArticleModule",
  },
  {
    path: "users",
    loadChildren: "./user/user.module#UserModule",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preload all modules
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
