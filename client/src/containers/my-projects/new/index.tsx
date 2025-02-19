import Wrapper from 'containers/wrapper';

import { FORM_STEPS } from '../constants';
import MyProjectsHeader from '../header';
import MyProjectsSidebar from '../sidebar';

export default function NewProject() {
  return (
    <Wrapper>
      <MyProjectsHeader />
      <div className="grid grid-cols-12 gap-16">
        <div className="col-span-3">
          <MyProjectsSidebar sections={FORM_STEPS} />
        </div>
        <div className="col-span-9">WIP Form</div>
      </div>
    </Wrapper>
  );
}
