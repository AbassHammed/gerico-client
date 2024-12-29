export default function HelpLeaves() {
  return (
    <div className="max-w-2xl space-y-6 p-6 bg-muted/50 rounded-lg">
      <h2 className="text-2xl font-semibold">Comment sélectionner vos congés</h2>

      <div className="space-y-4">
        <section className="space-y-2">
          <h3 className="text-lg font-medium">Règles générales</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Les jours passés ne peuvent pas être sélectionnés</li>
            <li>Les week-ends ne sont pas comptabilisés dans les congés</li>
            <li>Les jours fériés sont automatiquement exclus de votre sélection</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="text-lg font-medium">Comment sélectionner une période</h3>
          <p>Pour une semaine de congés du lundi au vendredi :</p>
          <div className="pl-6 space-y-2">
            <div className="flex items-start gap-2">
              <span className="font-semibold">1.</span>
              <p>
                Sélectionnez <span className="font-medium">00:00</span> dans le premier sélecteur
                d&apos;heure
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold">2.</span>
              <p>Cliquez sur le lundi de votre première journée de congés</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold">3.</span>
              <p>
                Sélectionnez <span className="font-medium">00:00</span> dans le deuxième sélecteur
                d&apos;heure
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold">4.</span>
              <p>Cliquez sur le lundi suivant votre dernière journée de congés</p>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <h3 className="text-lg font-medium">Exemple</h3>
          <p>Pour des congés du lundi 13 au vendredi 17 janvier 2025 :</p>
          <ul className="pl-6 list-disc space-y-1">
            <li>
              Premier sélecteur : <span className="font-medium">00:00</span> le lundi 13 janvier
            </li>
            <li>
              Deuxième sélecteur : <span className="font-medium">00:00</span> le lundi 20 janvier
            </li>
          </ul>
          <p className="text-sm text-muted-foreground mt-2">
            Note : Cette sélection inclura automatiquement les journées du 13, 14, 15, 16 et 17
            janvier, en excluant le week-end des 18 et 19 janvier.
          </p>
        </section>

        <section className="bg-blue-50 dark:bg-blue-950 p-4 rounded-md">
          <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300 mb-2">
            Bon à savoir
          </h3>
          <ul className="space-y-2 text-blue-600 dark:text-blue-400">
            <li>• Les jours de congés sont comptabilisés en jours ouvrés (du lundi au vendredi)</li>
            <li>• Une semaine complète de congés équivaut à 5 jours ouvrés</li>
            <li>
              • Les demandes peuvent être modifiées jusqu&apos;à leur validation par votre
              responsable
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
