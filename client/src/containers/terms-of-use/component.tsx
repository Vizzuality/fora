import Wrapper from 'containers/wrapper';

const TermsOfUse: React.FC = () => {
  return (
    <Wrapper>
      <section className="mb-10 prose max-w-none prose-slate lg:prose-lg">
        <h3>Cookies policy.</h3>
        <p>
          FORA may use cookies to personalize and make it as easy as possible for the User to
          navigate its Website. For further information, the User may consult the Cookies Policy
          above.
        </p>

        <h3>Generalities.</h3>
        <p>
          FORA will pursue the breach of these conditions, as well as any improper use of its Web
          Site, exercising all civil and criminal actions that may correspond to it in law. In the
          event that any point of this Legal Notice is considered null or unenforceable by the
          Public Administration or Administration of Justice, such nullity or non-application will
          not affect the rest of the contents of the Legal Notice. The non-exercise or execution by
          FORA of any right or provision contained in this Legal Notice shall not constitute a
          waiver thereof, unless acknowledged and expressly agreed in writing by FORA.
        </p>

        <h3>Modification of the present conditions and duration.</h3>
        <p>
          FORA can modify at any time the conditions determined here, being duly published as they
          appear here. The validity of the aforementioned conditions will be based on their exposure
          and will be in force until they are modified by others duly published.
        </p>
      </section>
    </Wrapper>
  );
};

export default TermsOfUse;
